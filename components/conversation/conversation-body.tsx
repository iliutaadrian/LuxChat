"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ConversationMessage} from "@/components/conversation/conversation-message";


interface ConversationItemProps {
    conversation: Conversation
}

export const ConversationBody =  ({
                                      conversation
                                  }:ConversationItemProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${conversation.id}`);

    }, [conversation.id, router])

    return (
        <div>
            <div className={'flex flex-col overflow-x-scroll items-start'}>
                <ConversationMessage conversation={conversation} role={'sender'}/>
                <ConversationMessage conversation={conversation} role={'receiver'}/>
            </div>

        </div>

    )
}