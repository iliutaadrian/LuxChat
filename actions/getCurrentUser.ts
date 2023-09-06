import getSession from "./getSession";
import prisma from "@/lib/prismadb";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        console.log(session)

        if (!session?.user?.username) {
            return null;
        }

        const currentUser = await prisma.user.findFirst({
            where: {
                username: session.user.username
            }
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        return null;
    }
};

export default getCurrentUser;