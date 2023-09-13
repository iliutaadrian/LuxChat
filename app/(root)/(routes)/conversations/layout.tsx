import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/conversation-list";
import {MobileFooter} from "@/components/sidebar/mobile-footer";
import {DesktopSidebar} from "@/components/sidebar/desktop-sidebar";
import useConversations from "@/hooks/useConversations";

export default async function RoutesLayout({
   children,
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()

    return (
        <div className="h-full">
            <div className={'hidden w-full md:flex flex-col md:w-80 fixed min-h-full p-5 border-muted-foreground md:border-r-2 md:ml-16'}>
                <DesktopSidebar/>
            </div>

            <div className={'flex w-full md:flex flex-col md:w-80 fixed min-h-full p-5 border-muted-foreground md:border-r-2 md:ml-16'}>
                <ConversationList conversations={conversations}/>
            </div>

            <div className={"md:pl-96 h-full"}>
                {children}
            </div>

            <MobileFooter/>
        </div>
    )
}
