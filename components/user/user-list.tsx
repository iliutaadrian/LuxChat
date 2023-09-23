"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useContext, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {  User } from "@prisma/client";
import {UserItem} from "@/components/user/user-item";
import {ScrollArea} from "@/components/ui/scroll-area";
import {MailPlus, UserPlus} from "lucide-react";
import {AddConversation} from "@/components/conversations/add-conversation";

interface UserListProps {
    users: User[],
}

export const UserList = ({users}:UserListProps) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className={'flex flex-col gap-5 h-full w-full'}>
            <div className="px-4 flex flex-row justify-between items-center">
                <h1 className={'text-2xl font-bold'}> People </h1>
                <AddConversation friends={users}/>
            </div>
            <ScrollArea >
                <div className={'flex flex-col gap-5'}>
                    {users?.map(user=>{
                        return (
                            <UserItem user={user} key={user.username}/>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}