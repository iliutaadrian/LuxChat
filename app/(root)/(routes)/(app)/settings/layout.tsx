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
            <div className={'hidden w-full md:flex flex-col md:w-80 fixed min-h-full p-5 border-muted-foreground md:border-r-2 md:ml-16'}>
                <DesktopSidebar/>
            </div>

            <div className={"md:pl-28 md:flex hidden h-full  align-middle items-center justify-center font-semibold text-xl text-muted-foreground"}>
                {children}
            </div>

            <MobileFooter/>
        </div>
    )
}
