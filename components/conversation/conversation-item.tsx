"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {Conversation, User} from "@prisma/client";
import {ConversationHeader} from "@/components/conversation/conversation-header";
import {ConversationBody} from "@/components/conversation/conversation-body";
import {ConversationInput} from "@/components/conversation/conversation-input";


interface ConversationItemProps {
    conversation: Conversation & {
        users: User[]
    }
}

export const ConversationItem =  ({
   conversation
}:ConversationItemProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${conversation.id}`);

    }, [conversation.id, router])

    return (
        <div className={'relative h-full bg-background'}>
            <ConversationHeader conversation={conversation}/>
            <ConversationBody conversation={conversation}/>
            <ConversationInput conversation={conversation}/>
        </div>
    )
}