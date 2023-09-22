import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
    request: Request,
) {

    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.username) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({id: member.value})),
                            {id: currentUser.id}
                        ]
                    }
                },
                include: {
                    users: true
                }
            })

            return new NextResponse(JSON.stringify(newConversation), {status: 200})
        }


        const existingConversation = await prisma.conversation.findMany({
            where: {
                users: {
                    some: {
                        id: {
                            in: [currentUser.id, userId],
                        },
                    },
                },
            },
        });

        const singleConversation = existingConversation[0];

        if (singleConversation) {
            return new NextResponse(JSON.stringify(singleConversation), {status: 200})
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {id: currentUser.id},
                        {id: userId}
                    ]
                }
            },
            include: {
                users: true
            }
        })

        return new NextResponse(JSON.stringify(newConversation), {status: 200})
    } catch (error) {
        console.error(error)
        return new NextResponse('Internal Server Error', {status: 500})
    }

}