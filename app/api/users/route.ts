import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/lib/prismadb";

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
            conversationId,
            deleteType
        } = body;

        if (!conversationId) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
            },
            include: {
                users: true
            }
        })

        if (!conversation) {
            return new NextResponse('Unauthorized', { status: 401 });
        }


        if (deleteType === 'delete-data') {
            const deletedMessages = await prisma.message.deleteMany({
                where: {
                    conversationId: conversationId,
                }
            })
            return new NextResponse('Deleted All the data', { status: 200 })
        }
        else if (deleteType === 'delete-user-data') {
            const deletedMessages = await prisma.message.deleteMany({
                where: {
                    conversationId: conversationId,
                }
            })
            const deletedConversation = await prisma.conversation.delete({
                where: {
                    id: conversationId
                }
            })
            return new NextResponse('Deleted the user and data', { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}