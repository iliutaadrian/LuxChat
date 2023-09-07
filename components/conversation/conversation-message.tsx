"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  Conversation } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";


interface ConversationItemProps {
    conversation: Conversation,
    role: 'sender' | 'receiver'
}

export const ConversationMessage =  ({
                                         conversation,
                                         role
}:ConversationItemProps) => {
    return (
        <div>
            <div className={cn('flex my-2 p-3 cursor-pointer rounded-lg items-end', role === 'sender' ? 'flex-row-reverse text-right items-end' : 'flex-row')}>
                <div className={'w-10 h-10 relative'}>
                    <Avatar>
                        <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" />
                        <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
                    </Avatar>
                </div>
                <div className={cn("flex flex-col", role === 'sender' && 'items-end')}>
                    <div className={cn('text-slate-950 rounded-2xl p-3 mx-3 mb-2 w-fit', role === 'sender' ? 'bg-blue-300' : 'bg-sky-300')}>
                        <div className="">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ad adipisci alias aliquid a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ad adipisci alias aliquid a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ad adipisci alias aliquid a
                        </div>
                    </div>
                    <div className={cn('text-slate-950 rounded-2xl p-3 mx-3 mb-2 w-fit', role === 'sender' ? 'bg-blue-300' : 'bg-sky-300')}>
                            message
                    </div>

                    <div className={'mx-4 text-xs text-slate-600'}>
                        12:30 AM
                    </div>
                </div>

            </div>
        </div>

    )
}