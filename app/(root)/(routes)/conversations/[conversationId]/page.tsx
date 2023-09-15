import getConversation from "@/actions/getConversation";
import {ConversationItem} from "@/components/conversation/conversation-item";
import {useSession} from "next-auth/react";

interface ConversationIdParams{
    conversationId: string,
}
const ConversationPage = async ({ params }:{ params:ConversationIdParams }) => {
    const conversation = await getConversation(params.conversationId)

    if(!conversation){
        return <div>Loading...</div>
    }
    console.log(1)
    return (
        <>
            <ConversationItem conversation={conversation} />
        </>
    )
}

export default ConversationPage