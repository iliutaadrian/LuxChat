"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Conversation, User} from "@prisma/client";
import {UserItem} from "@/components/user/user-item";
import {ConversationsItem} from "@/components/conversations/conversations-item";


interface ConversationListProps {
    conversations: Conversation[],
}

const ConversationList = ({conversations}:ConversationListProps) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className={'ml-16'}>
            <h1 className={'text-xl font-bold'}> Messages </h1>
            {conversations?.map(conv=>{
                return (
                    <ConversationsItem conversation={conv} key={conv.id}/>
                )
            })}
        </div>
    )
}

export default ConversationList