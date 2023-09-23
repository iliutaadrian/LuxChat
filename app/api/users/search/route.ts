import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            username,
        } = body;

        if (!username) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.username) {
            return new NextResponse('Unauthorized', {status: 401})

        }

        const user = await prisma.user.findUnique({
            where: {
                username: username.toLowerCase()
            }
        })

        if (!user) {
            return new NextResponse('User not found', {status: 404})
        }

        return new NextResponse(JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', {status: 500})
    }
}