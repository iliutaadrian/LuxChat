"use client"

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {format} from 'date-fns';
import Image from 'next/image'
import {FullMessageType} from "@/types";
import {useUser} from "@clerk/nextjs";


interface ConversationItemProps {
    message: FullMessageType,
    otherUser: any
}

export const ConversationMessage =  ({
                                         message,
                                         otherUser
}:ConversationItemProps) => {
    const {user} = useUser()
    if (!user) {
        return null
    }

    const role = user.id === message.user ? 'sender' : 'reciever'
    const selected_user = user.id === message.user ? user : otherUser

    return (
        <div>
            <div className={cn('flex my-2 p-3 cursor-pointer rounded-lg items-end', role === 'sender' ? 'flex-row-reverse text-right items-end' : 'flex-row')}>
                    <div className={'w-10 h-10 relative'}>
                        <Avatar>
                            <AvatarFallback className={'border border-primary'}>{selected_user.username.charAt(0).toUpperCase()}</AvatarFallback>
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
                            {selected_user.username} <span className={'text-muted-foreground'}>{format(new Date(message?.createdAt), 'yyyy/MM/dd kk:mm')}</span>
                        </div>
                    </div>

                </div>
        </div>

    )
}