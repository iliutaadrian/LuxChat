// "use client"

import getConversation from "@/actions/getConversation";
import {ConversationItem} from "@/components/conversation/conversation-item";

interface ConversationIdParams{
    conversationId: string,
}
const ConversationPage = async ({ params }:{ params:ConversationIdParams }) => {
    const conversation = await getConversation(params.conversationId)

    return (
        <div>
            <ConversationItem conversation={conversation} />
        </div>
    )
}

export default ConversationPage