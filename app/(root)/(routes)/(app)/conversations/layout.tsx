import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/conversation-list";
import getUserFriends from "@/actions/getUserFriends";

export default async function RoutesLayout({
   children,
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()
    const friends = await getUserFriends()

    return (
        <>
            <div className={'flex w-full md:flex flex-col md:w-80 fixed min-h-full py-5 px-5 sm:px-2 border-muted-foreground md:border-r-2 md:ml-20'}>
                <ConversationList initialConversations={conversations} friends={friends}/>
            </div>

            <div className={"md:pl-[25em] h-full"}>
                {children}
            </div>
        </>
    )
}
