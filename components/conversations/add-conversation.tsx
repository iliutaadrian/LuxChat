import {Button} from "@/components/ui/button";
import {MailPlus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

export const AddConversation = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <MailPlus className="w-5 h-5 cursor-pointer"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-background/50 sm:w-full sm:max-w-xl p-5 rounded-xl w-11/12 md:w-9/12 mx-auto border-4 border-primary/10 shadow-2xl top-1/4">
                    <DialogHeader>
                        <DialogTitle>Search Users</DialogTitle>
                        <DialogDescription>
                            Search for users by username or add a new user
                        </DialogDescription>
                    </DialogHeader>
                    <Command>
                        <CommandInput placeholder="Search user" />
                        <CommandList>
                            <CommandEmpty>Add this new user...</CommandEmpty>
                            <CommandGroup>
                                <CommandItem>Calendar</CommandItem>
                                <CommandItem>Search Emoji</CommandItem>
                                <CommandItem>Calculator</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    )
}