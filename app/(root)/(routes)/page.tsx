"use client"
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

export default function RootPage() {
    return (
        <div className={"flex flex-col min-h-full justify-center align-middle text-center"}>
            Hello Root
            <Button onClick={()=>signOut()}>Click me</Button>
        </div>
    )
}
