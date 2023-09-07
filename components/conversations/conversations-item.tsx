"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";


interface ConversationItemProps {
    conversation: Conversation
}

export const ConversationsItem =  ({
    conversation
}:ConversationItemProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${conversation.id}`);

    }, [conversation.id, router])

    return (
        <div onClick={handleClick} className={'bg-slate-400/10 hover:bg-slate-400/20 flex flex-row my-5 p-2 cursor-pointer align-middle items-center rounded-lg'}>
            <div className={'w-10 h-10 relative'}>
                <Avatar>
                    <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" alt="conversation" />
                    <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
                </Avatar>
                <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
            </div>
            <p className={'ml-2 text-sm font-medium'}>
                Mesasuffl tau ad fost fdsfd
            </p>
        </div>
    )
}