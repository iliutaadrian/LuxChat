"use client"

import useRoutes from "@/hooks/useRoutes";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ModeToggle} from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import useConversations from "@/hooks/useConversations";
import {signOut} from "next-auth/react";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import {UserAvatarDropdown} from "@/components/sidebar/user-avatar-dropdown";

export const DesktopSidebar = () => {
    const routes = useRoutes()

    const [isMounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <div className={"md:fixed sm:w-20 z-20 inset-y-0 left-0 border-r-2 border-muted-foreground items-center flex flex-col bg-background justify-between py-10"}>
            <div className="flex flex-col gap-10">
                {routes.map((route) => {
                    return (
                        <div key={route.label}>
                            <Link href={route.href} className={cn("rounded-xl cursor-pointer w-16 h-16 flex flex-col align-middle justify-center hover:bg-muted text-center", route.active && `bg-muted-foreground/20`)}>
                                <route.icon className={`w-10 h-10 mx-auto p-1 ${route.color}`} />
                                <span className={'text-xs text-muted-foreground'}>{route.label}</span>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center">
                <UserAvatarDropdown/>
            </div>
        </div>
    )
}
