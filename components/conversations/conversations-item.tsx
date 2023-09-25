"use client"

import {useCallback, useEffect, useMemo} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {FullConversationType, FullMessageType} from "@/types";
import {pusherClient} from "@/lib/pusher";


interface ConversationItemProps {
    conversation: FullConversationType
}

export const ConversationsItem =  ({
    conversation
}:ConversationItemProps) => {
    const otherUser = conversation.users_full

    const handleClick = useCallback(()=>{
        window.location.href = `/conversations/${conversation.id}`;
    }, [conversation.id])


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
        <div onClick={handleClick} className={'m-1 shadow-neonLight flex flex-row gap-2 cursor-pointer align-middle items-center p-5 rounded-lg bg-background/50 hover:bg-background'}>
            <div className={'w-10 h-10 relative'}>
                <Avatar>
                    <AvatarFallback className={'border border-primary'}>{otherUser?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className={'absolute top-0 right-0 even:bg-green-500 bg-slate-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
            </div>
            <div className={'flex flex-col'}>
                <p className={'ml-2 text-sm font-medium'}>
                    {otherUser?.username}
                </p>
                <p className={'ml-2 text-xs text-muted-foreground'}>
                    {lastMessageText}
                </p>
            </div>

        </div>
    )
}