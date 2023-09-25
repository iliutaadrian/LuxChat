import {Conversation, Message} from "@prisma/client";

export type UserClerk = {
    id: string,
    username:  string | null | undefined,
    createdAt: number | null | undefined
}

export type FullMessageType = Message

export type FullConversationType = Conversation & {
    users_full: UserClerk,
    messages: FullMessageType[]
}