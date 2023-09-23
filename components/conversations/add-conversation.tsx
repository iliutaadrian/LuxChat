import {Button} from "@/components/ui/button";
import { MailPlus, Plus, PlusCircle, Smile, User } from "lucide-react";
import { User as PrismaUser } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
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
import {Separator} from "@/components/ui/separator";
import {ChangeEvent, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";

interface AddConversationProps {
    friends: PrismaUser[]
}
export const AddConversation = ({ friends }: AddConversationProps) => {
    const [userValue, setUserValue] = useState('');

    const handleUserValueChange = (value: string) => setUserValue(value);

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const newConversationFriend = async (userId: number) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/conversations', {
                userId: userId,
            });
            const conversationId = response.data.id;

            window.location.href = `/conversations/${conversationId}`;
        } catch (error) {
            console.error('Error starting new conversation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const newConversation = async () => {
        try {
            setIsLoading(true);
            const searchResponse = await axios.post('/api/users/search', {
                username: userValue,
            });
            const userId = searchResponse.data.id;

            // Second API call to create a conversation
            const conversationResponse = await axios.post('/api/conversations', {
                userId: userId,
            });
            const conversationId = conversationResponse.data.id;

            window.location.href = `/conversations/${conversationId}`;
        } catch (error) {
            console.error('Error starting new conversation:', error);
            toast({
                variant: 'destructive',
                // @ts-ignore
                description: error.response.data,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <MailPlus className="w-5 h-5 cursor-pointer" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-background/50 sm:w-full sm:max-w-xl p-5 rounded-xl w-11/12 md:w-9/12 mx-auto border-none shadow-neon">
                <DialogHeader>
                    <DialogTitle>Search Users</DialogTitle>
                    <DialogDescription>
                        Search for users by username or add a new user
                    </DialogDescription>
                    <Separator />
                </DialogHeader>
                <Command>
                    <CommandInput
                        placeholder="Search user"
                        onValueChange={handleUserValueChange}
                        value={userValue}
                        disabled={isLoading}
                    />
                    <CommandList>
                        <CommandEmpty>
                            <Button
                                variant={'ghost'}
                                className="w-full"
                                onClick={newConversation}
                                disabled={isLoading}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />Add new user: <span className="text-primary ml-1">{userValue}</span>
                            </Button>
                        </CommandEmpty>
                        <CommandGroup heading="Existing users">
                            {friends.map((user) => (
                                <Button
                                    key={user.id}
                                    variant={'ghost'}
                                    onClick={() => newConversationFriend(user.id)}
                                    className="w-full"
                                >
                                    <CommandItem className="cursor-pointer py-2 w-full">
                                        <User className="mr-2 h-4 w-4" />
                                        {user.username}
                                    </CommandItem>
                                </Button>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    );
};