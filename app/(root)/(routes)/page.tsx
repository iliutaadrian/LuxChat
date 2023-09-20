import React from 'react';
import {Coffee, Key, MessageCircle, User} from "lucide-react";
import Link from "next/link";

function HeroSection() {
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
            icon: <Key size={24} />, // Lucide icon for a key
            title: 'Unique ID',
            description: 'Get a unique ID to share with your friends and connect instantly.',
        },
        {
            icon: <MessageCircle size={24} />, // Lucide icon for a message circle
            title: 'Messenger-Like UI',
            description: 'Lux Chat features a Messenger-like UI for discreet messaging.',
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-t from-primary/50 to-background">
            <div className="relative z-10 flex flex-col items-center justify-center h-screen">
                {/* Hero Copy */}
                <div className="mt-16 flex flex-col items-center gap-4 text-white">
                    <h1 className="text-4xl md:text-6xl font-medium text-center md:w-[802px]">
                        Welcome to <span className={'font-bold text-primary'}>Lux Chat</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-center md:w-[572px]">
                        Your Private and Secure Messaging Experience
                    </p>
                    <div className="mt-4 text-sm text-center">
                        <ul className="list-none pl-4 grid grid-cols-2 gap-5">
                            {rules.map((rule, index) => (
                                <li key={index} className="p-4 rounded-lg shadow-2xl bg-background/50 hover:bg-background group">
                                    <div className="flex items-center mb-2">
                                        <div className="mr-2 text-primary group-item">{rule.icon}</div>
                                        <h3 className="text-lg font-semibold group-hover:text-primary">{rule.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{rule.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Hero CTA Buttons */}
                <div className="mt-8 flex items-center gap-4">
                    <Link href={'/conversations'} className="bg-background/50 hover:bg-primary/40 text-white py-3 px-6 rounded-xl font-semibold hover:bg-crimson-10">
                        Start Chatting
                    </Link>

                    <Link href={'/users'} className="bg-primary/40 hover:bg-background/50 text-white py-3 px-6 rounded-xl font-semibold hover:bg-crimson-10">
                        Explore Users
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
