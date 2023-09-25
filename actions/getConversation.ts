import prisma from "@/lib/prismadb";
import {clerkClient, currentUser} from '@clerk/nextjs';
import {NextResponse} from "next/server";

const getConversation = async (conversationId:string) => {
    try{
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
        })

        const userId = conversation?.users.filter((id) => id !== user.id);

        const user_search = await clerkClient.users.getUserList({userId});

        const conversation_with_users = {
            ...conversation,
            users_full: {
                id: user_search[0].id,
                username: user_search[0].username,
                createdAt: user_search[0].createdAt,
            }
        }

        return conversation_with_users
    } catch (error: any) {
        console.log(error)
        return null
    }
};

export default getConversation;