import prisma from '@/lib/prismadb';
import {NextResponse} from "next/server";
import {currentUser} from "@clerk/nextjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            type,
            conversationId
        } = body;

        if (!type) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const user = await currentUser();
        if (!user) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        if (!conversationId) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (type === 'delete-data') {
            await prisma.message.deleteMany({
                where: {
                    conversationId: conversationId,
                }
            })
            return new NextResponse('Deleted All the data', { status: 200 })
        }
        else if (type === 'delete-user-data') {
            await prisma.message.deleteMany({
                where: {
                    conversationId: conversationId,
                }
            })
            await prisma.conversation.delete({
                where: {
                    id: conversationId
                }
            })
            return new NextResponse('Deleted the user and data', { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', {status: 500})
    }
}