import {NextResponse} from "next/server";
import prisma from "@/lib/prismadb";
import {pusherServer} from "@/lib/pusher";
import {currentUser} from "@clerk/nextjs";

export async function POST(
    request: Request,
) {
    try{
        const user = await currentUser();
        if (!user) {
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
                user: user.id,
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
            }
        })

        // await pusherServer.trigger(`conversation-${conversationId}`, 'new-message', newMessage)
        //
        // const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
        // updatedConversation.users.map((user) => {
        //     pusherServer.trigger(`user-${user.id}`, 'conversation-update', {
        //         id: conversationId,
        //         lastMessage: lastMessage,
        //     })
        // })

        return new NextResponse(JSON.stringify(newMessage), { status: 200 });

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal server error', { status: 500 });
    }
}