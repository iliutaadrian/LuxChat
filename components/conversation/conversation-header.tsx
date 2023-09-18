"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {Conversation, User} from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import useOtherUser from "@/hooks/useOtherUser";


interface ConversationItemProps {
    conversation: Conversation & {
        users: User[]
    }
}
export const ConversationHeader =  ({
    conversation
}:ConversationItemProps) => {
    const otherUser = useOtherUser(conversation)

    return (
        <div className={'sticky top-0 bg-secondary z-20'}>
            <div className={'flex flex-row px-5 py-3 justify-between align-middle items-center border-b-2 border-muted-foreground'}>
        <div className={'flex flex-row items-center'}>
        <Link href={'/conversations'}>
        <ChevronLeft className={'cursor-pointer mr-4'}/>
</Link>
    <div className={'w-10 h-10 relative'}>
        <Avatar>
            <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" alt="conversation" width={'8'} height={'8'} />
            <AvatarFallback className={'shadow-lg shadow-black'} ></AvatarFallback>
        </Avatar>
        <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
    </div>
    <div className={'flex flex-col ml-2'}>
        <p className={'text-md font-medium'}>
            {otherUser?.username}
        </p>
        <span className={'text-xs text-muted-foreground'}>Active</span>
    </div>
    </div>
        <MoreHorizontal className={'text-primary hover:text-primary-foreground text-right cursor-pointer'}/>
    </div>
        </div>

    )
}