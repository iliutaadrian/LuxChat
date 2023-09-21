"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {  User } from "@prisma/client";
import {UserItem} from "@/components/user/user-item";
import {ScrollArea} from "@/components/ui/scroll-area";
import {MailPlus, UserPlus} from "lucide-react";


interface UserListProps {
    users: User[],
}

export const UserList = ({users}:UserListProps) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className={'flex flex-col gap-5 h-full w-full'}>
            <div className="px-4 flex flex-row justify-between items-center">
                <h1 className={'text-xl font-bold'}> People </h1>
                <UserPlus
                    className="w-6 h-6 cursor-pointer"/>
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