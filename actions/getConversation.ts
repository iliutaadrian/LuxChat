import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import {NextResponse} from "next/server";
import {never} from "zod";

const getConversation = async (conversationId:string) => {
    try{
        const currentUser = await getCurrentUser();

        if (!currentUser?.username) {
            return null;
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            },
        })

        return conversation
    } catch (error: any) {
        console.log(error)
        return null
    }
};

export default getConversation;