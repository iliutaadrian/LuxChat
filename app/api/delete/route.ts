import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            type,
        } = body;

        if (!type) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.username) {
            return new NextResponse('Unauthorized', {status: 401})

        }

        if (type === 'account') {
            await prisma.user.delete({
                where: {
                    id: currentUser.id,
                },
            })


            return new NextResponse('Deleted', {status: 200})
        }
        if (type === 'messages') {
            await prisma.message.deleteMany({
                where: {
                    userId: currentUser.id,
                },
            })

            return new NextResponse('Deleted All Messages', {status: 200})
        }
        if (type === 'all') {
            await prisma.conversation.deleteMany({
                where: {
                    users: {
                        some: {
                            id: currentUser.id,
                        },
                    }
                },
            })

            return new NextResponse('Deleted All Users&Messages', {status: 200})
        }

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', {status: 500})
    }
}