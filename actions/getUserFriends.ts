import getSession from "./getSession";
import prisma from "@/lib/prismadb";

const getUserFriends = async () => {
    const session = await getSession();

    if (!session?.user?.username) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    username: session.user.username
                }
            }
        });

        return users;
    } catch (error: any) {
        return [];
    }
};

export default getUserFriends;