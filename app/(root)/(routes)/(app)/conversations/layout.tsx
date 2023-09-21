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
        <>
            <div className={'flex w-full md:flex flex-col md:w-80 fixed min-h-full py-5 px-2  border-muted-foreground md:border-r-2 md:ml-20'}>
                <ConversationList initialConversations={conversations}/>
            </div>

            <div className={"md:pl-96 h-full"}>
                {children}
            </div>
        </>
    )
}
