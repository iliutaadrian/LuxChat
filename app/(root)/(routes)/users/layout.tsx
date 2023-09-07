import {Navbar} from "@/components/navbar";
import {Sidebar} from "@/components/sidebar";
import {UserList} from "@/components/user/user-list";
import getUsers from "@/actions/getUsers";

export default async function RoutesLayout({
   children,
}: {
    children: React.ReactNode
}) {
    const users = await getUsers()

    return (
        <div className="h-full bg-slate-100">
            <Navbar/>
            <div className={'hidden md:flex flex-col w-80 fixed min-h-full p-5 border-slate-500/20 border-2'}>
                <Sidebar/>
                <UserList users={users}/>
            </div>
            <div className={"lg:block md:pl-80 h-full"}>
                <div className={" flex flex-col items-center justify-center h-full"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
