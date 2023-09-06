"use client"

import getUsers from "@/actions/getUsers";
import {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {  User } from "@prisma/client";
import {UserItem} from "@/components/user/user-item";


interface UserListProps {
    users: User[],
}

export const UserList = ({users}:UserListProps) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className={'ml-16'}>
            <h1 className={'text-xl font-bold text-slate-900'}> People </h1>
            {users?.map(user=>{
                return (
                    <UserItem user={user} key={user.username}/>
                )
            })}
        </div>
    )
}