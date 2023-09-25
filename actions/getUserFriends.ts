import prisma from "@/lib/prismadb";
import {clerkClient, currentUser} from '@clerk/nextjs';

const getUserFriends = async () => {
    const user = await currentUser();

    if (!user) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                users: {
                    has: user.id,
                },
            },
        });

        const friends = await Promise.all(conversations.map(async conversation => {
            const userId = conversation?.users.filter((id) => id !== user.id);
            const user_search = await clerkClient.users.getUserList({userId});

            return {
                id: user_search[0].id,
                username: user_search[0].username,
                createdAt: user_search[0].createdAt,

            }
        }))
        return friends || [];
    } catch (error: any) {
        return [];
    }
};

export default getUserFriends;