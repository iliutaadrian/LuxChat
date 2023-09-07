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
            <div onClick={handleClick} className={'bg-slate-400/10 hover:bg-slate-400/20 flex flex-row p-3 cursor-pointer align-middle items-center rounded-lg'}>
                <ChevronLeft/>
                <div className={'w-10 h-10 relative'}>
                    <Avatar>
                        <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" alt="conversation" width={'8'} height={'8'} />
                        <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
                    </Avatar>
                    <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
                </div>
                <p className={'ml-2 text-sm font-medium'}>
                    Alex Smith
                </p>
                <span>Active</span>
                <MoreHorizontal/>
            </div>
            <div className={'bg-slate-400/10 hover:bg-slate-400/20 flex flex-row p-3 cursor-pointer align-middle items-center rounded-lg'}>
                <div className={'w-10 h-10 relative'}>
                    <Avatar>
                        <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" />
                        <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
                    </Avatar>
                </div>
                <div className={''}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ad adipisci alias aliquid a
                </div>
            </div>
            <div onClick={handleClick} className={'absolute md:bottom-0 bottom-20 w-full'}>
                <div className={'z-20 bg-slate-100 border-slate-300/30 border w-full align-middle flex flex-row items-center h-14'}>
                    <Mic/>
                    <Image/>
                    <Input className={'ml-2'} placeholder={'Send a message...'}/>

                    <SendHorizonal/>
                </div>
            </div>
        </div>

    )
}