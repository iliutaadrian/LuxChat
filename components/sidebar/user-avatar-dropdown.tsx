import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui//button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ModeToggle} from "@/components/mode-toggle";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import {currentUser, SignOutButton, useUser} from "@clerk/nextjs";

export const UserAvatarDropdown = () => {
    const { user } = useUser();

    if (!user) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className={'text-xl'}>
                            {user?.username?.charAt(0).toUpperCase() ?? ''}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-none shadow-neonLight" align="start" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            active
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Dark mode
                        <DropdownMenuShortcut>
                            <ModeToggle/>
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>{window.location.replace('/settings')}}>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SignOutButton>
                        <p className="flex flex-row justify-between w-full cursor-pointer">
                            Log out
                            <DropdownMenuShortcut>
                                <HiArrowLeftOnRectangle className={'w-5 h-5'} />
                            </DropdownMenuShortcut>
                        </p>
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}