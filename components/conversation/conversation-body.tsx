"use client"

import {useEffect, useRef, useState} from "react";
import {ConversationMessage} from "@/components/conversation/conversation-message";
import {ScrollArea} from "@/components/ui/scroll-area";
import {pusherClient} from "@/lib/pusher";
import {FullConversationType, FullMessageType} from "@/types";
import useConversations from "@/hooks/useConversations";

interface ConversationItemProps {
    conversation: FullConversationType

}

export const ConversationBody =  ({
                                      conversation,
}:ConversationItemProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView()
    }

    const [messages, setMessages] = useState<FullMessageType[]>(conversation.messages);
    const {conversationId} = useConversations()

    useEffect(() => {
        pusherClient.subscribe(`conversation-${conversationId}`)
        scrollToBottom()

        const messageHandler = (message: FullMessageType) => {
            setMessages((current) => {
                return [...current, message]
            })
            scrollToBottom()
        }


        pusherClient.bind( 'new-message', messageHandler)

        return () => {
            pusherClient.unbind( 'new-message', messageHandler)
            pusherClient.unsubscribe(`conversation-${conversationId}`)
        }
    }, [conversationId])

    return (
        <div className={'flex flex-col items-start h-screen'}>
            <ScrollArea className="w-full h-full">
                {messages?.map((message) => {
                    return (
                        <ConversationMessage
                            key={message.id}
                            message={message}
                            otherUser={conversation.users_full}
                        />
                    )
                })}
                <div className="pt-5" ref={bottomRef} />
            </ScrollArea>
        </div>
    )
}