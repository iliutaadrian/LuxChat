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

export const ConversationInput =  ({
   conversation
}:ConversationItemProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const sendMessage = useCallback(() => {
        alert("Message sent: " + message);
    }, [message]);


    return (
        <div className={'absolute md:bottom-0 bottom-20 w-full'}>
            <div className={'z-20 bg-slate-100 border-slate-300/30 border w-full align-middle flex flex-row items-center h-20 gap-4 px-4'}>
                <Mic className={'bg-slate-200 rounded-full p-2 cursor-pointer hover:bg-slate-400'} width={'50'} height={'40'}/>
                <Image className={'bg-slate-200 rounded-full p-2 cursor-pointer hover:bg-slate-400'} width={'50'} height={'40'}/>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} className={'ml-2 rounded-2xl border border-slate-500/10'} placeholder={'Send a message...'}/>
                <SendHorizonal onClick={sendMessage} className={'bg-sky-400 text-slate-100 rounded-full p-2 cursor-pointer hover:bg-slate-400 hover:text-slate-900'} width={'50'} height={'40'}/>
            </div>
        </div>

    )
}