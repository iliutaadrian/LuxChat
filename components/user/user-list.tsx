"use client"

import {useState} from "react";
import {UserItem} from "@/components/user/user-item";
import {ScrollArea} from "@/components/ui/scroll-area";
import {AddConversation} from "@/components/conversations/add-conversation";
import {UserClerk} from "@/types";

interface UserListProps {
    users: UserClerk[],
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