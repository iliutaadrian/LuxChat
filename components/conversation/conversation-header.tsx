"use client"

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import {ProfileDrawer} from "@/components/profile-drawer";


interface ConversationItemProps {
    conversation: any
}

export const ConversationHeader = ({
                                       conversation
                                   }: ConversationItemProps) => {

    const otherUser = conversation.users_full

    return (
        <div className={'sticky top-0 bg-background z-20'}>
            <div
                className={'flex flex-row px-5 py-3 justify-between align-middle items-center border-b-2 border-muted-foreground'}>
                <div className={'flex flex-row items-center'}>
                    <Link href={'/conversations'}>
                        <ChevronLeft className={'cursor-pointer mr-4'}/>
                    </Link>
                    <div className={'w-10 h-10 relative'}>
                        <Avatar>
                            <AvatarFallback className={'border border-primary'}>{otherUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span
                            className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
                    </div>
                    <div className={'flex flex-col ml-2'}>
                        <p className={'text-md font-medium'}>
                            {otherUser?.username}
                        </p>
                        <span className={'text-xs text-muted-foreground'}>Active</span>
                    </div>
                </div>
                <ProfileDrawer conversationId={conversation.id} user={otherUser}/>
            </div>
        </div>

    )
}