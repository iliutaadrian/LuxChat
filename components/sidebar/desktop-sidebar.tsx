"use client"

import useRoutes from "@/hooks/useRoutes";
import {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const DesktopSidebar = () => {
    const routes = useRoutes()
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="md:fixed lg:w-20 z-20 inset-y-0 left-0 border-slate-500/20 border-2 w-16 align-middle flex flex-col items-center">
            <nav>
                <ul role={'list'} className={''}>
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
