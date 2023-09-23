import getSession from "./getSession";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

const getUserFriends = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const friends = await prisma.user.findMany({
            where: {
                conversations: {
                    some: {
                        users: {
                            some: {
                                id: currentUser.id,
                            },
                        },
                    },
                },
                id: {
                    not: currentUser.id,
                },
            },
        });

        return friends || [];
    } catch (error: any) {
        return [];
    }
};

export default getUserFriends;