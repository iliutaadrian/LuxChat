"use client"

import {useEffect, useState} from "react";
import {ConversationsItem} from "@/components/conversations/conversations-item";
import useConversations from "@/hooks/useConversations";
import {FullConversationType, FullMessageType, UserClerk} from "@/types";
import {ScrollArea} from "@/components/ui/scroll-area";
import {AddConversation} from "@/components/conversations/add-conversation";
import {UserJSON} from "@clerk/types";
import {pusherClient} from "@/lib/pusher";
import {useUser} from "@clerk/nextjs";


interface ConversationListProps {
    initialConversations: any[],
    friends: UserClerk[]
}

const ConversationList = ({initialConversations, friends}:ConversationListProps) => {
    const {isOpen} = useConversations()
    const [conversations, setConversations] = useState<FullConversationType[]>(initialConversations)
    const {user} = useUser()

    useEffect(() => {
        if (!user) return
        pusherClient.subscribe(`${user?.id}`)

        const updateHandler = (conversation: any) => {

            setConversations((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: [...currentConversation.messages, conversation.lastMessage]
                    };
                }

                return currentConversation;
            }));
        }

        pusherClient.bind( 'conversation-update', updateHandler)

        return () => {
            pusherClient.unbind( 'conversation-update', updateHandler)
            pusherClient.unsubscribe(`${user?.id}`)
        }
    }, []);

    return (
        <div className={`flex flex-col gap-5 h-full w-full ${isOpen && 'max-md:hidden'}`}>
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