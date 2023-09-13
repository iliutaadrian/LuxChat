// "use client"

import getConversation from "@/actions/getConversation";
import {ConversationItem} from "@/components/conversation/conversation-item";

interface ConversationIdParams{
    conversationId: string,
}
const ConversationPage = async ({ params }:{ params:ConversationIdParams }) => {
    const conversation = await getConversation(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    No messages
                </div>
            </div>
        )
    }

    return (
        <div>
            <ConversationItem conversation={conversation} />
        </div>
    )
}

export default ConversationPage