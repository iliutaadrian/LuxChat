import {NextResponse} from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    try{
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.username) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const body = await request.json();
        const {
            message,
            image,
            conversationId,
        } = body;

        if (!conversationId) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        return new NextResponse(JSON.stringify(newMessage), { status: 200 });

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal server error', { status: 500 });
    }
}