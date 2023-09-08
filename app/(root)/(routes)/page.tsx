"use client"
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

export default function RootPage() {
    return (
        <>
            Rules:
            - every day 6 in the morning, all the messages are deleted
            - just an username for your profile
            - you get one unique ID to share with your friends
            - Messenger similar UI for discretion
        </>

    )
}
