import getConversation from "@/actions/getConversation";
import {ConversationItem} from "@/components/conversation/conversation-item";

interface ConversationIdParams{
    conversationId: string,
}
const ConversationPage = async ({ params }:{ params:ConversationIdParams }) => {
    const conversation = await getConversation(params.conversationId)

    if(!conversation){
        return <div className="flex items-center justify-center w-full h-full">Loading...</div>
    }
    return (
        <>
            <ConversationItem conversation={conversation} />
        </>
    )
}

export default ConversationPage