"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";


interface ConversationItemProps {
    conversation: Conversation
}

export const ConversationHeader =  ({
                                      conversation
                                  }:ConversationItemProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        router.push(`/conversations/${conversation.id}`);

    }, [conversation.id, router])

    return (
        <div onClick={handleClick} className={'bg-slate-400/10 flex flex-row px-5 py-3 justify-between align-middle items-center rounded-lg border-b-2 border-slate-500/20'}>
                <div className={'flex flex-row'}>
                    <ChevronLeft/>
                    <div className={'w-10 h-10 relative'}>
                        <Avatar>
                            <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" alt="conversation" width={'8'} height={'8'} />
                            <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
                        </Avatar>
                        <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
                    </div>
                    <div className={'flex flex-col ml-2'}>
                        <p className={'text-md font-medium'}>
                            Alex Smith
                        </p>
                        <span className={'text-xs'}>Active</span>
                    </div>
                </div>
                <MoreHorizontal className={'text-sky-400 text-right'}/>
            </div>
    )
}