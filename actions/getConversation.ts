import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversation = async (conversationId:string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }


    try {
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            }
        });

        return conversation;
    } catch (error: any) {
        return [];
    }
};

export default getConversation;