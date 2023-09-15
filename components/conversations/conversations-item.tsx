"use client"

import {useRouter} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import {FullConversationType} from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import {useSession} from "next-auth/react";


interface ConversationItemProps {
    conversation: FullConversationType
}

export const ConversationsItem =  ({
    conversation
}:ConversationItemProps) => {
    const router = useRouter()
    const otherUser = useOtherUser(conversation)
    console.log(useSession())
    console.log(otherUser)
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${conversation.id}`);

    }, [conversation.id, router])


    const lastMessage = useMemo(()=>{
        return conversation.messages[conversation.messages.length - 1]
    }, [conversation.messages])

    const lastMessageText = useMemo(()=>{
        if (lastMessage?.image) {
            return 'Sent an image'
        }
        if (lastMessage?.body) {
            return lastMessage?.body
        }

        return 'Started a conversation'
    }, [lastMessage])


    return (
        <div onClick={handleClick} className={'flex flex-row gap-2 p-4 cursor-pointer align-middle items-center rounded-lg bg-muted hover:bg-muted-foreground/20'}>
            <div className={'w-10 h-10 relative'}>
                <Avatar>
                    <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" alt="conversation" />
                    <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
                </Avatar>
                <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
            </div>
            <div className={'flex flex-col'}>
                <p className={'ml-2 text-sm font-medium'}>
                    {otherUser.username}
                </p>
                <p className={'ml-2 text-xs text-muted-foreground'}>
                    {lastMessageText}
                </p>
            </div>

        </div>
    )
}