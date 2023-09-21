"use client"

import {usePathname} from "next/navigation";
import React, {useContext, useMemo} from "react";
import useConversations from "@/hooks/useConversations";
import {HiChat, HiUsers} from "react-icons/hi";
import {signOut} from "next-auth/react";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import {Cog, MessageCircle, Radiation, Trash2} from "lucide-react";

const useRoutes = () => {
    const pathname = usePathname()

    const {conversationId} = useConversations();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
            color: 'text-primary'
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users',
            color: 'text-green-300'
        },
        {
            label: 'Settings',
            href: '/settings',
            icon: Cog,
            active: pathname === '/settings',
            color: 'text-gray-300'
        },
        {
            label: 'Nuclear',
            href: '/nuclear',
            icon: Radiation,
            active: pathname === '/nuclear',
            color: 'text-yellow-500'
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes;