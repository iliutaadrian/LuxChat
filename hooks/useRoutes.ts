import {usePathname} from "next/navigation";
import {useContext, useMemo} from "react";
import useConversations from "@/hooks/useConversations";
import {HiChat, HiUsers} from "react-icons/hi";
import {signOut} from "next-auth/react";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import {Cog, Radiation, Trash2} from "lucide-react";

const useRoutes = () => {
    const pathname = usePathname()

    const {conversationId} = useConversations();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
            color: 'bg-blue-400'
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users',
            color: 'green'
        },
        {
            label: 'Settings',
            href: '/settings',
            icon: Cog,
            active: pathname === '/settings',
            color: 'green'
        },
        {
            label: 'Nuclear',
            href: '/nuclear',
            icon: Radiation,
            active: pathname === '/nuclear',
            color: 'red'
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes;