"use client"

import {ConversationHeader} from "@/components/conversation/conversation-header";
import {ConversationBody} from "@/components/conversation/conversation-body";
import {ConversationInput} from "@/components/conversation/conversation-input";
import {FullConversationType, FullMessageType} from "@/types";

interface ConversationItemProps {
    conversation: any
}

export const ConversationItem =  ({
   conversation
}:ConversationItemProps) => {

    return (
        <div className={'relative'}>
            <ConversationHeader conversation={conversation} />
            <ConversationBody conversation={conversation}/>
            <ConversationInput conversation={conversation}/>
        </div>
    )
}