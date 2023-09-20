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


interface ConversationListProps {
    initialConversations: FullConversationType[],
}

const ConversationList = ({initialConversations}:ConversationListProps) => {
    const session = useSession()
    const userId = session?.data?.user?.id
    const [conversations, setConversations] = useState<FullConversationType[]>(initialConversations)

    useEffect(()=>{
        if (!userId) return
        pusherClient.subscribe(`user-${userId}`)

        const updateConversation = (conversation: FullConversationType) => {
            console.log('conversation-update', conversation)
            // setConversations((current) =>
            //     current.map((conv) => {
            //         if (conv.id === conversation.id) {
            //             return {
            //                 ...conv,
            //                 messages: conversation.messages
            //             }
            //         }
            //         return conv
            //     }))
        }

        pusherClient.bind('conversation-update', updateConversation)


        return () => {
            pusherClient.unbind('conversation-update', updateConversation)
            pusherClient.unsubscribe(`user-${userId}`)
        }
    }, [userId])

    return (
        <div className={cn('flex flex-col gap-5 h-full p-2')}>
            <div className="flex flex-row justify-between items-center">
                <h1 className={'text-xl font-bold'}> Messages </h1>
                <MailPlus
                className="w-5 h-5 cursor-pointer"/>
            </div>
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