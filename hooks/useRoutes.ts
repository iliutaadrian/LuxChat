import {usePathname} from "next/navigation";
import {useContext, useMemo} from "react";
import useConversations from "@/hooks/useConversations";
import {HiChat, HiUsers} from "react-icons/hi";
import {signOut} from "next-auth/react";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";

const useRoutes = () => {
    const pathname = usePathname()

    const {conversationId} = useConversations();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users',
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes;