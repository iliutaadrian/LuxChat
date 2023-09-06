import {useParams} from "next/navigation";
import {useMemo} from "react";

const useConversations = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        if (!params?.conversationId)
            return null;

        return params.conversationId as string;
    }, [params?.conversationId])

    const isOpen = useMemo(() => {
        return !!conversationId;
    }, [conversationId])


    return useMemo(() => {
        return {
            isOpen,
            conversationId
        }
    }, [conversationId, isOpen])
}

export default useConversations;