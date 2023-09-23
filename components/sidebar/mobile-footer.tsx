"use client"

import useRoutes from "@/hooks/useRoutes";
import {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import useConversations from "@/hooks/useConversations";
import {UserAvatarDropdown} from "@/components/sidebar/user-avatar-dropdown";

export const MobileFooter = () => {
    const routes = useRoutes()
    const {isOpen} = useConversations()

    return (
        <div className={`md:hidden flex flex-row ${isOpen && 'hidden'}`}>
            <nav className="fixed z-20 inset-x-0 bottom-0 border-t-2 border-muted-foreground w-full align-middle flex flex-row items-center h-20 bg-background">
                <ul role={'list'} className={'flex flex-row w-full justify-evenly'}>
                    {routes.map((route) => {
                        return (
                            <li key={route.label}>
                                <Link href={route.href} className={cn("rounded-xl cursor-pointer w-14 h-14 flex flex-col align-middle justify-center hover:bg-muted text-center", route.active && `bg-muted-foreground/20`)}>
                                    <route.icon className={`w-8 h-8 mx-auto p-1 ${route.color}`} />
                                    <span className={'text-xs text-muted-foreground'}>{route.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <div className="flex justify-center">
                        <UserAvatarDropdown/>
                    </div>
                </ul>
            </nav>
        </div>
    )
}
