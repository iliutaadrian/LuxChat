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
        <div className="h-full bg-background">
            <div className={'hidden w-full md:flex flex-col md:w-80 fixed min-h-full p-5 border-muted-foreground md:border-r-2 md:ml-16'}>
                <DesktopSidebar/>
            </div>

            <div className={'flex w-full md:flex flex-col md:w-80 fixed min-h-full p-5 border-muted-foreground md:border-r-2 md:ml-16'}>
                <UserList users={users}/>
            </div>
            <div className={"lg:block md:pl-80 h-full"}>
                {children}
            </div>

            <MobileFooter/>
        </div>
    )
}
