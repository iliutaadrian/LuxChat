"use client"

import { Button } from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useSession} from "next-auth/react";
import {Rule} from "postcss";
import {Rules} from "@/components/rules";

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: "Please enter a valid URL." }),
            })
        )
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: "I own a computer.",
    urls: [
        { value: "https://shadcn.com" },
        { value: "http://twitter.com/shadcn" },
    ],
}
const SettingsPage = () => {
    const session = useSession()
    const user = session?.data?.user

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }
    return (
        <div className="p-10 flex flex-col gap-5">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Unique Identifier</h2>
                <p className="text-primary text-4xl font-medium">
                    {user?.username}
                </p>
                <Separator className="my-4"/>
            </div>

            <Rules/>

            <div className="flex flex-col gap-5">
                <Button variant="destructive">Delete Account</Button>
                <Button variant="destructive">Delete All Messages</Button>
                <Button variant="destructive">Delete All Users&Messages</Button>
            </div>
        </div>
    );
};

export default SettingsPage