"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Conversation, User} from "@prisma/client";
import {UserItem} from "@/components/user/user-item";
import {ConversationsItem} from "@/components/conversations/conversations-item";
import useConversations from "@/hooks/useConversations";
import {cn} from "@/lib/utils";
import {FullConversationType, FullMessageType} from "@/types";
import {ScrollArea} from "@/components/ui/scroll-area";
import {MailPlus} from "lucide-react";
import {pusherClient} from "@/lib/pusher";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {AddConversation} from "@/components/conversations/add-conversation";


interface ConversationListProps {
    initialConversations: FullConversationType[],
    friends: User[]
}

const ConversationList = ({initialConversations, friends}:ConversationListProps) => {
    const session = useSession()
    const userId = session?.data?.user?.id
    const [conversations, setConversations] = useState<FullConversationType[]>(initialConversations)

    return (
        <div className={cn('flex flex-col gap-5 h-full w-full')}>
            <div className="px-4 flex flex-row justify-between items-center">
                <h1 className={'text-2xl font-bold'}> Messages </h1>
                <AddConversation friends={friends}/>
            </div>
            <ScrollArea >
                <div className={'flex flex-col gap-5'}>
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