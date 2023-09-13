"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {  User } from "@prisma/client";
import {UserItem} from "@/components/user/user-item";
import {ScrollArea} from "@/components/ui/scroll-area";


interface UserListProps {
    users: User[],
}

export const UserList = ({users}:UserListProps) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className={'flex flex-col gap-5 h-full'}>
            <h1 className={'text-xl font-bold'}> People </h1>
            <ScrollArea >
                <div className={'flex flex-col gap-5 h-screen'}>
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