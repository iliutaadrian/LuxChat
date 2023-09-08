import {Navbar} from "@/components/navbar";
import {Sidebar} from "@/components/sidebar";
import {UserList} from "@/components/user/user-list";
import getUsers from "@/actions/getUsers";
import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/conversation-list";

export default async function RoutesLayout({
                                               children,
                                           }: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()

    return (
        <div className="h-full bg-background">
            <Navbar/>
            <div className={'hidden md:flex flex-col w-80 fixed min-h-full p-5 border-muted-foreground border-r-2'}>
                <Sidebar/>
                <ConversationList conversations={conversations}/>
            </div>
            <div className={"lg:block md:pl-80 h-full"}>
                <div className={"h-full"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
