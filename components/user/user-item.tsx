"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import {  User } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


interface UserItemProps {
    user: User
}

export const UserItem =  ({
    user
}:UserItemProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        setIsLoading(true)

        axios.post('/api/conversations', {
            userId: user.id
        }).then((data) => {
            router.push(`/conversations/${data.data.id}`);
        }).finally(() => setIsLoading(false));

    }, [user, router])

    return (
        <div onClick={handleClick} className={'bg-slate-400/10 hover:bg-slate-400/20 flex flex-row my-5 p-3 cursor-pointer align-middle items-center rounded-lg'}>
            <div className={'w-10 h-10 relative'}>
                <Avatar>
                    <AvatarImage className={'shadow-lg shadow-black'} src="/placeholder.jpg" alt="user" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
            </div>
            <p className={'ml-2 text-sm font-medium'}>
                {user.username}
            </p>
        </div>
    )
}