import prisma from '@/lib/prismadb';
import {NextResponse} from "next/server";
import {clerkClient, currentUser} from "@clerk/nextjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            type,
            userId
        } = body;

        if (!type) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const user = await currentUser();
        if (!user) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        await prisma.message.deleteMany({
            where: {
                conversation: {
                    users: {
                        has: user.id
                    }
                }
            }
        });

        if (type === 'messages')
            return new NextResponse('Deleted All Messages', {status: 200})

        await prisma.conversation.deleteMany({
            where: {
                users: {
                    has: user.id
                }
            },
        })

        if (type === 'all')
            return new NextResponse('Deleted All Users&Messages', {status: 200})

        await clerkClient.users.deleteUser(user.id);

        if (type === 'account')
            return new NextResponse('Deleted', {status: 200})

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', {status: 500})
    }
}