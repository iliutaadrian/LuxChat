"use client"

import useRoutes from "@/hooks/useRoutes";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ModeToggle} from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import useConversations from "@/hooks/useConversations";
import {signOut} from "next-auth/react";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import {UserAvatarDropdown} from "@/components/sidebar/user-avatar-dropdown";
import {Coffee, Key, MessageCircle, Radiation, User} from "lucide-react";

export const Rules = () => {
    const rules = [
        {
            icon: <Coffee size={24} />, // Lucide icon for a coffee cup
            title: 'Daily Message Deletion',
            description: 'Every day at 4 AM, all messages are automatically deleted.',
        },
        {
            icon: <User size={24} />, // Lucide icon for a user
            title: 'Username Profile',
            description: 'You can use just an username for your Lux Chat profile.',
        },
        {
            icon: <Radiation size={24} />, // Lucide icon for a key
            title: 'Nuclear Mode',
            description: 'With a single click, delete all messages and users.',
        },
        {
            icon: <MessageCircle size={24} />, // Lucide icon for a message circle
            title: 'Messenger-Like UI',
            description: 'Lux Chat features a Messenger-like UI for discreet messaging.',
        },
    ];

    return (
        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-5">
            {rules.map((rule, index) => (
                <li key={index} className="p-5 rounded-lg shadow-neonLight bg-background/50 hover:bg-background group">
                    <div className="flex items-center mb-2">
                        <div className="mr-2 text-primary group-item">{rule.icon}</div>
                        <h3 className="text-lg font-semibold group-hover:text-primary">{rule.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-left">{rule.description}</p>
                </li>
            ))}
        </ul>
    )
}
