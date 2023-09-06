import {Sidebar} from "@/components/sidebar";
import {Navbar} from "@/components/navbar";

export default function UserLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (


        <div className="h-full bg-slate-100">
            <Navbar/>
            <div className="mt-16 w-20 flex-col fixed inset-y-0">
                <Sidebar/>
            </div>
            <div className={"lg:block md:pl-80 h-full"}>
                <div className={"bg-slate-500 flex flex-col items-center justify-center h-full"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
