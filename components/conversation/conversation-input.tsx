"use client"

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {  Conversation } from "@prisma/client";
import {ChevronLeft, MoreHorizontal, Image, PlusCircle, SendHorizonal, Mic} from "lucide-react";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {CldUploadButton} from "next-cloudinary";


interface ConversationItemProps {
    conversation: Conversation
}

export const ConversationInput =  ({
                                       conversation
}:ConversationItemProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const sendMessage = (e:any) => {
        e.preventDefault();

        if (message.length < 1) return;
        setIsLoading(true);

        axios.post(`/api/messages`, {
            message: message,
            conversationId: conversation.id,
        }).then((res) => {
            setMessage('');
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.error('Error sending message:', error);
        });
    };

    const handleUpload = (result:any) => {
        setIsLoading(true)
        axios.post(`/api/messages`, {
            image: result?.info?.secure_url,
            conversationId: conversation.id
        })
    }


    return (
        <div className={'sticky pb-10 md:pb-0 bottom-0 w-full bg-secondary'}>
            <form onSubmit={sendMessage}>
                <div className={'z-20 border-t-2 border-muted-foreground w-full align-middle flex flex-row items-center h-20 gap-4 px-4'}>
                    <Button
                        variant={'ghost'}
                        disabled={isLoading}
                        className={'bg-muted-foreground/50 hover:bg-muted-foreground rounded-full p-2 cursor-pointer'}
                    >
                        <Mic/>
                    </Button>

                    <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onUpload={(res) => {handleUpload(res)}}
                        uploadPreset='atnv4tk5'
                        className={'bg-muted-foreground/50 hover:bg-muted-foreground rounded-full p-2 cursor-pointer'}>
                        <Image/>
                    </CldUploadButton>

                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={'rounded-2xl border'}
                        placeholder={'Send a message...'}
                        disabled={isLoading}/>

                    <Button
                        variant={'ghost'}
                        disabled={isLoading || message.length < 1}
                        type={'submit'}
                        className={'bg-primary/70 hover:bg-primary rounded-full p-2 cursor-pointer'}
                    >
                        <SendHorizonal/>
                    </Button>
                </div>
            </form>
        </div>

    )
}