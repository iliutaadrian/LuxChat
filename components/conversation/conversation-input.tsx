"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";


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
        toast({
            variant: "destructive",
            description: "Something went wrong"
        })
    }, [message]);


    return (
        <div className={'sticky pb-10 md:pb-0 bottom-0 w-full bg-secondary'}>
            <div className={'z-20 border-t-2 border-muted-foreground w-full align-middle flex flex-row items-center h-20 gap-4 px-4'}>
                <Mic className={'rounded-full p-2 cursor-pointer bg-muted-foreground/50 hover:bg-muted-foreground'} width={'50'} height={'40'}/>
                <Image className={'rounded-full p-2 cursor-pointer bg-muted-foreground/50 hover:bg-muted-foreground'} width={'50'} height={'40'}/>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} className={'ml-2 rounded-2xl border'} placeholder={'Send a message...'}/>
                <SendHorizonal onClick={sendMessage} className={'bg-primary/70 hover:bg-primary rounded-full p-2 cursor-pointer'} width={'50'} height={'40'}/>
            </div>
        </div>

    )
}