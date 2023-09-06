import {DesktopSidebar} from "@/components/sidebar/desktop-sidebar";
import {MobileFooter} from "@/components/sidebar/mobile-footer";

export const Sidebar = () => {
    return(
        <div className={'hidden md:flex flex-col w-80 fixed min-h-full p-5'}>
            <DesktopSidebar/>
        </div>
    )
}