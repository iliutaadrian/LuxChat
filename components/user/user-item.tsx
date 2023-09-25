"use client"

import axios from "axios";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {signOut} from "next-auth/react";
import {toast} from "@/components/ui/use-toast";


interface UserItemProps {
    user: any
}

export const UserItem =  ({
    user
}:UserItemProps) => {
    const handleClick = async ()=> {
        try {
            await axios.post('/api/conversations', {
                userId: user.id
            }).then((data) => {
                window.location.href = `/conversations/${data.data.id}`
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                // @ts-ignore
                description: error.response.data,
            });
        }
    }

    return (
        <div onClick={handleClick} className={'m-1 shadow-neonLight flex flex-row gap-2 cursor-pointer align-middle items-center p-5 rounded-lg bg-background/50 hover:bg-background'}>
            <div className={'w-10 h-10 relative'}>
                <Avatar>
                    <AvatarFallback className={'border border-primary'}>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className={'absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full shadow-xl shadow-black'}> </span>
            </div>
            <p className={'ml-2 text-sm font-medium'}>
                {user.username}
            </p>
        </div>
    )
}