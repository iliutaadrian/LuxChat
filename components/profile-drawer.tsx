"use client"

import {User} from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Calendar, MoreHorizontal, Trash, Trash2, User2} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface ProfileDrawerProps {
    user: User,
    conversationId: string
}

export const ProfileDrawer = ({
                                  user,
                                  conversationId
}: ProfileDrawerProps) => {
    const router = useRouter()

    const deleteData = (deleteType: string) => {
        axios.post(`/api/users`, {
            conversationId: conversationId,
            deleteType: deleteType
        }).then(() => {
            router.push('/conversations/')
        })
    }

    return (
        <Sheet>
            <SheetTrigger>
                <MoreHorizontal
                    className={'text-primary hover:text-primary-foreground text-right cursor-pointer'}/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetDescription className={'flex flex-col items-center align-middle gap-3 pt-10'}>
                        <div className={'w-20 h-20 relative pl-1'}>
                            <Avatar className={'w-20 h-20'}>
                                <AvatarImage
                                    className={'shadow-lg shadow-black'}
                                    src="/placeholder.jpg"
                                    alt="conversation"
                                    width={'40'} height={'40'}/>
                                <AvatarFallback className={'shadow-lg shadow-black'}></AvatarFallback>
                            </Avatar>
                            <span
                                className={'absolute top-0 right-0 bg-green-500 border-2 border-primary w-4 h-4 rounded-full shadow-xl shadow-black'}>
                                    </span>
                        </div>
                        <div className={'flex flex-col ml-2 text-center'}>
                            <p className={'text-2xl font-medium text-foreground'}>
                                {user?.username}
                            </p>
                            <span className={'text-md text-muted-foreground'}>Active</span>
                        </div>
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-5 mt-10">
                    <div className="flex items-start space-x-4 p-2 transition-all hover:bg-accent hover:text-accent-foreground border-b-2 border-muted-foreground">
                        <User2 className="mt-px h-5 w-5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Username</p>
                            <p className="text-sm text-muted-foreground">
                                {user?.username}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4 p-2 transition-all hover:bg-accent hover:text-accent-foreground border-b-2 border-muted-foreground">
                        <Calendar className="mt-px h-5 w-5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Joined</p>
                            <p className="text-sm text-muted-foreground">
                                {format(user?.createdAt, 'yyyy/MM/dd kk:mm')}
                            </p>
                        </div>
                    </div>
                    <Button variant={'ghost'} onClick={() => deleteData('delete-data')} className="flex flex-row items-center space-x-4 p-2 transition-all cursor-pointer bg-muted-foreground/50 hover:bg-accent rounded-md hover:text-accent-foreground border-2 border-muted-foreground mt-10">
                        <Trash className="mt-px h-5 w-5" />
                        <p className="text-sm font-medium leading-none">Delete data</p>
                    </Button>

                    <Button variant={'ghost'} onClick={() => deleteData('delete-user-data')} className="flex flex-row items-center space-x-4 p-2 transition-all cursor-pointer bg-muted-foreground/50 hover:bg-accent rounded-md hover:text-accent-foreground border-2 border-muted-foreground">
                        <Trash2 className="mt-px h-5 w-5" />
                        <p className="text-sm font-medium leading-none">Delete user & data</p>
                    </Button>


                    <p className="text-sm text-muted-foreground">
                        * All the data will be automatically be delete every day at 4:00AM
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    )
}