"use client"

import useRoutes from "@/hooks/useRoutes";
import {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import useConversations from "@/hooks/useConversations";

export const MobileFooter = () => {
    const routes = useRoutes()
    const {isOpen} = useConversations();

    return (
        <div className={`${isOpen && 'hidden'}`}>
            <nav className="fixed z-20 inset-x-0 bottom-0 bg-slate-100 border-slate-300/30 border w-full align-middle flex flex-row items-center h-14">
                <ul role={'list'} className={'flex flex-row w-full justify-evenly'}>
                    {routes.map((route) => {
                        return (
                            <li key={route.label} onClick={route?.onClick}>
                                <Link href={route.href} className={cn("text-slate-500 hover:text-slate-900 hover:bg-slate-300 mx-2 my-5 gap-x-3 rounded-xl cursor-pointer w-12 h-12 flex flex-col align-middle justify-center", route.active && `bg-slate-300/80 text-slate-900`)}>
                                    <route.icon icon={route.icon} className={'w-8 h-8 mx-auto p-1'} />
                                    <span className={'sr-only'}>{route.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

