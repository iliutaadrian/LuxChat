"use client"

import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default async function NuclearPage() {
    useEffect(() => {
        const deleteAccount = async () => {
            try {
                await axios.post('/api/delete', {
                    type: 'account'
                });

                window.location.href = 'https://www.google.com';
            } catch (error) {
                toast({
                    variant: 'destructive',
                    // @ts-ignore
                    description: error.response.data,
                });
            }
        };

        deleteAccount();
    }, []);

    return (
        <div></div>
    );
}