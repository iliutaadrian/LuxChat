import {MobileFooter} from "@/components/sidebar/mobile-footer";
import getCurrentUser from "@/actions/getCurrentUser";
import getSession from "@/actions/getSession";

export const Navbar = async () => {
    const currentUser = await getCurrentUser()

    return(
        <div className={'md:hidden p-5 flex flex-row'}>
            {currentUser?.username}
            <MobileFooter/>
        </div>
    )
}