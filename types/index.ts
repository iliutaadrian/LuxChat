import {Conversation, Message} from "@prisma/client";

export type UserClerk = {
    id: string,
    username: string,
    createdAt: string
}

export type FullMessageType = Message

export type FullConversationType = Conversation & {
    users_full: UserClerk,
    messages: FullMessageType[]
}