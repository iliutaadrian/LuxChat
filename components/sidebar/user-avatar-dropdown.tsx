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
import {signOut, useSession} from "next-auth/react";
import {ModeToggle} from "@/components/mode-toggle";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";

export function UserAvatarDropdown() {
    const session = useSession()
    const user = session?.data?.user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className={'border border-primary text-xl'}>
                            {user?.username?.charAt(0).toUpperCase() ?? ''}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-primary/50" align="start" forceMount>
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
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>{signOut()}}>
                    Log out
                    <DropdownMenuShortcut><HiArrowLeftOnRectangle className={'w-5 h-5'} /></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}