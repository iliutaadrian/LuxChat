"use client"

import {Conversation, Message} from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import {useSession} from "next-auth/react";
import Image from 'next/image'
import {FullMessageType} from "@/types";


interface ConversationItemProps {
    message: FullMessageType,
}

export const ConversationMessage =  ({
                                         message,
}:ConversationItemProps) => {
    const session = useSession()
    const role = session?.data?.user?.username === message?.sender?.username ? 'sender' : 'reciever'

    return (
        <div>
            <div className={cn('flex my-2 p-3 cursor-pointer rounded-lg items-end', role === 'sender' ? 'flex-row-reverse text-right items-end' : 'flex-row')}>
                    <div className={'w-10 h-10 relative'}>
                        <Avatar>
                            <AvatarFallback className={'border border-primary'}>{message.sender.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className={cn("flex flex-col", role === 'sender' && 'items-end')}>
                        <div className={cn('rounded-2xl p-3 mx-3 mb-2 w-fit', role === 'sender' ? 'bg-primary' : 'bg-primary/30')}>
                            <div className="">
                                {message.body}

                                {message?.image && (
                                    <Image
                                        src={message?.image}
                                        width={300}
                                        height={300}
                                        alt={String(message.id)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={'mx-4 text-xs pb-1'}>
                            {message.sender.username} <span className={'text-muted-foreground'}>{format(new Date(message?.createdAt), 'yyyy/MM/dd kk:mm')}</span>
                        </div>
                    </div>

                </div>
        </div>

    )
}