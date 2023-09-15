import {FullConversationType} from "@/types";
import {useSession} from "next-auth/react";
import {useEffect, useMemo} from "react";
import {User} from "@prisma/client";

const useOtherUser = (conversation:FullConversationType | {users: User[]}) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const username = session.data?.user?.username;
        // const username = 'trag'

        const otherUser = conversation.users.filter((user) => user.username !== username);

        return otherUser[0];
    }, [session.data?.user?.username, conversation.users]);

    return otherUser;
}

export default useOtherUser