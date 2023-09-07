"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ConversationHeader} from "@/components/conversation/conversation-header";
import {ConversationBody} from "@/components/conversation/conversation-body";
import {ConversationInput} from "@/components/conversation/conversation-input";


interface ConversationItemProps {
    conversation: Conversation
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
        <div className={'relative max-w-screen-xl h-screen'}>
            <ConversationHeader conversation={conversation}/>
            <ConversationBody conversation={conversation}/>
            <ConversationInput conversation={conversation}/>
        </div>

    )
}