import prisma from '@/lib/prismadb';
import {NextResponse} from "next/server";
import {clerkClient, currentUser} from "@clerk/nextjs";

export async function POST(request: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse('Unauthorized', {status: 401})

        }

        const body = await request.json();
        const {
            username,
        } = body;

        if (!username || username == user.username) {
            return new NextResponse('Wrong username', { status: 400 });
        }


        const user_search = await clerkClient.users.getUserList({
            username: username
        });

        if (!user_search.length) {
            return new NextResponse('User not found', {status: 404})
        }

        return new NextResponse(JSON.stringify(user_search[0]), {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', {status: 500})
    }
}