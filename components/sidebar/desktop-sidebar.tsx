"use client"

import useRoutes from "@/hooks/useRoutes";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ModeToggle} from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const DesktopSidebar = () => {
    const routes = useRoutes()
    const [isOpened, setIsOpened] = useState(false)


    const [isMounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <div className="md:fixed lg:w-20 z-20 inset-y-0 left-0 border-r-2 border-muted-foreground w-16 align-middle flex flex-col items-center">
            <nav>
                <ul role={'list'}>
                    {routes.map((route) => {
                        return (
                            <li key={route.label} onClick={route?.onClick}>
                                <Link href={route.href} className={cn("mx-2 my-5 gap-x-3 rounded-xl cursor-pointer w-12 h-12 flex flex-col align-middle justify-center hover:bg-muted", route.active && `bg-muted-foreground/30`)}>
                                    <route.icon icon={route.icon} className={'w-8 h-8 mx-auto p-1'} />
                                    <span className={'sr-only'}>{route.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li className={'text-center'}>
                        <ModeToggle className={"mx-auto my-5 gap-x-3 rounded-xl cursor-pointer w-12 h-12 flex flex-col align-middle justify-center text-center"}/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
