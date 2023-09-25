"use client"

import {useEffect, useRef, useState} from "react";
import {ConversationMessage} from "@/components/conversation/conversation-message";
import {pusherClient} from "@/lib/pusher";
import {FullConversationType, FullMessageType} from "@/types";

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

    useEffect(() => {
        scrollToBottom()
        pusherClient.subscribe(`conversation-${conversation.id}`)

        const messageHandler = (message: FullMessageType) => {
            setMessages((current) => [...current, message]);
        }

        pusherClient.bind( 'new-message', messageHandler)

        return () => {
            pusherClient.unbind( 'new-message', messageHandler)
            pusherClient.unsubscribe(`conversation-${conversation.id}`)
        }
    }, [messages, conversation]);

    return (
            <div className="flex-1 overflow-y-auto">
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
            </div>
    )
}