import {NextResponse} from "next/server";
import prisma from "@/lib/prismadb";
import {currentUser} from "@clerk/nextjs";

export async function POST(
    request: Request,
) {

    try{
        const body = await request.json();
        const { userId, isGroup, members, name } = body;

        const user = await currentUser();
        if (!user) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const existingConversation = await prisma.conversation.findFirst({
            where: {
                users: {
                    hasEvery: [userId, user.id]
                }
            },
        });


        if (existingConversation) {
            return new NextResponse(JSON.stringify(existingConversation), {status: 200})
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: [user.id, userId]
            }
        })

        return new NextResponse(JSON.stringify(newConversation), {status: 200})
    } catch (error) {
        console.error(error)
        return new NextResponse('Internal Server Error', {status: 500})
    }

}