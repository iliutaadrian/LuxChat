import {MobileFooter} from "@/components/sidebar/mobile-footer";
import getCurrentUser from "@/actions/getCurrentUser";
import getSession from "@/actions/getSession";

export const Navbar = async () => {
    const currentUser = await getCurrentUser()

    return(
        <div className={'md:hidden flex flex-row'}>
            <MobileFooter/>
        </div>
    )
}