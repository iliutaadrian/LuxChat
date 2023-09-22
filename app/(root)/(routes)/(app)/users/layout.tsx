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
        <>
            <div className={'flex w-full md:flex flex-col md:w-80 fixed min-h-full py-5 px-5 sm:px-2 border-muted-foreground md:border-r-2 md:ml-20'}>
                <UserList users={users}/>
            </div>

            <div className={"md:pl-96 h-full"}>
                {children}
            </div>
        </>
    )
}
