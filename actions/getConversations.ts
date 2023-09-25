import prisma from "@/lib/prismadb";
import {clerkClient, currentUser} from '@clerk/nextjs';
import {NextResponse} from "next/server";

const getConversations = async () => {
    const user = await currentUser();

    if (!user?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc',
            },
            where: {
                users: {
                    has: user.id,
                },
            },
            include: {
                messages: true,
            }
        });

        const conversations_with_users = await Promise.all(conversations.map(async conversation => {
            const userId = conversation?.users.filter((id) => id !== user.id);
            const user_search = await clerkClient.users.getUserList({userId});

            return {
                ...conversation,
                users_full: {
                    id: user_search[0].id,
                    username: user_search[0].username,
                    createdAt: user_search[0].createdAt,

                }
            };
        }))

        return conversations_with_users;
    } catch (error: any) {
        return [];
    }
};

export default getConversations;