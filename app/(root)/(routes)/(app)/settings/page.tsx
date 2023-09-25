"use client"

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {signOut} from "next-auth/react";
import {Rules} from "@/components/rules";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useState} from "react";
import {useUser} from "@clerk/nextjs";

const SettingsPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useUser()
    if (!user) {
        return null
    }

    const deleteData = async (type:string) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/delete', {
                type
            });

            toast({
                variant: 'destructive',
                description: response.data,
            });

            if (type === 'account') {
                await signOut()
                window.location.href = 'https://www.google.com'
            }
            else {
                window.location.href = '/conversations/'
            }
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
        <div className="p-10 flex flex-col gap-5 max-sm:pb-28">
            <div>
                <h1 className="text-2xl font-bold">Unique Identifier</h1>
                <p className="text-primary text-4xl font-medium">
                    {user?.username}
                </p>
                <Separator className="my-4"/>
                <div className="flex flex-col gap-5 max-w-md mx-auto text-center">
                    <p className="text-sm text-muted-foreground">
                        * All the messages will be delete every day at 4:00AM
                    </p>
                    <p className="text-sm text-muted-foreground">
                        ** Pressing the buttons will not display a confirmation
                    </p>
                    <Button disabled={isLoading} onClick={() => deleteData('messages')} variant="destructiveLight">Delete All Messages</Button>
                    <Button disabled={isLoading} onClick={() => deleteData('all')} variant="destructiveLight">Delete All Users&Messages</Button>
                    <Button disabled={isLoading} onClick={() => deleteData('account')} variant="destructive">Delete Account</Button>
                </div>
            </div>

            <Rules/>
        </div>
    );
};

export default SettingsPage