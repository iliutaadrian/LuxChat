import React from 'react';
import {Coffee, Key, MessageCircle, User} from "lucide-react";
import Link from "next/link";
import {
    pickFontFileForFallbackGeneration
} from "next/dist/compiled/@next/font/dist/local/pick-font-file-for-fallback-generation";
import {Rules} from "@/components/rules";

function HeroSection() {


    return (
        <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 to-background">
            <div className="relative z-10 flex flex-col items-center justify-center h-screen">
                <div className="mt-16 flex flex-col items-center gap-4 text-white">
                    <h1 className="text-3xl md:text-6xl font-medium text-center md:w-[802px]">
                        Welcome to <span className={'font-bold text-primary'}>Lux Chat</span>
                    </h1>
                    <p className="text-md md:text-2xl text-center md:w-[572px]">
                        Your Private and Secure Messaging Experience
                    </p>

                    <div className="flex items-center gap-4">
                        <Link href={'/conversations'} className="bg-primary hover:bg-primary/50 text-white py-3 px-6 rounded-xl font-semibold">
                            Start Chatting
                        </Link>

                        <Link href={'/users'} className="bg-primary/50 hover:bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-crimson-10">
                            Explore Users
                        </Link>
                    </div>
                    <div className="mt-4 px-3 text-sm text-center">
                        <Rules/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroSection;
