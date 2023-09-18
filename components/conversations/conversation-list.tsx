"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Conversation, User} from "@prisma/client";
import {UserItem} from "@/components/user/user-item";
import {ConversationsItem} from "@/components/conversations/conversations-item";
import useConversations from "@/hooks/useConversations";
import {cn} from "@/lib/utils";
import {FullConversationType, FullMessageType} from "@/types";
import {ScrollArea} from "@/components/ui/scroll-area";


interface ConversationListProps {
    conversations: FullConversationType[],
}

const ConversationList = ({conversations}:ConversationListProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const {isOpen} = useConversations()


    return (
        <div className={cn('flex flex-col gap-5 h-full p-2')}>
            <h1 className={'text-xl font-bold'}> Messages </h1>
            <ScrollArea >
                <div className={'flex flex-col gap-5 h-screen'}>
                    {conversations?.map(conv=>{
                        return (
                            <ConversationsItem conversation={conv} key={conv.id}/>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}

export default ConversationList