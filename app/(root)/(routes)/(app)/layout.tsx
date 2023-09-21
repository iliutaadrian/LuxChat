import {UserList} from "@/components/user/user-list";
import getUsers from "@/actions/getUsers";
import {DesktopSidebar} from "@/components/sidebar/desktop-sidebar";
import ConversationList from "@/components/conversations/conversation-list";
import {MobileFooter} from "@/components/sidebar/mobile-footer";

export default async function RoutesLayout({
   children,
}: {
    children: React.ReactNode
}) {
    const users = await getUsers()

    return (
        <div className="h-full">
            <div className={'hidden w-full md:flex flex-col'}>
                <DesktopSidebar/>
            </div>
            {children}
            <MobileFooter/>
        </div>
    )
}
