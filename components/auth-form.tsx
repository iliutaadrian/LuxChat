"use client"

import {useCallback, useEffect, useState} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

const formSchema = z.object({
    username: z.string().min(1, {
        message: 'Username is required',
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})
const AuthForm = () => {
    const [variant, setVariant] = useState('signin')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        const checkSessionAndRedirect = async () => {
            if (session?.status === 'authenticated') {
                await router.push('/');
            }
        };

        checkSessionAndRedirect();
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        setVariant(variant === 'signin' ? 'signup' : 'signin')
        form.reset()
    }, [variant])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        // TODO: Fix this
        if (variant === 'signin') {
            signIn('credentials', {
                username: values.username,
                password: values.password,
            }).then((callback) => {
                callback?.error ? console.log(111) : router.push('/')
            }).finally(() => {
                setIsLoading(false)
            })
        }

        if (variant === 'signup') {
            try {
                await axios.post('/api/auth/register', values)
                signIn('credentials', values)
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Something went wrong"
                })
            }
            finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className={'max-w-md mx-auto'}>
            <h1 className={'text-center text-xl font-semibold py-5'}>
                {variant === 'signin' ? "Sign in to your account" : "Create your account"}
            </h1>
            <div className="h-full md:max-w-3xl mx-auto">
                <Form {...form}>
                    <form
                        className="space-y-8 pb-10"
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="">
                            <FormField
                                name={"username"}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className={'mb-5'}>
                                        <FormLabel className={"text-sm font-normal"}>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={"rounder-lg border-primary/20 bg-transparent mt-0"}
                                                type="text"
                                                disabled={isLoading}
                                                {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                name={"password"}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className={'mb-5'}>
                                        <FormLabel className={"text-sm font-normal"}>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={"rounder-lg border-primary/20 bg-transparent"}
                                                type="password"
                                                disabled={isLoading}
                                                {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button variant={'ghost'} className={'bg-primary hover:bg-primary/50 w-full'} type="submit" size="lg" disabled={isLoading} >
                                {variant === 'signin' ? "Login" : "Register"}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className={'text-sm font-light text-center'}>
                    {variant === 'signin' ? 'New to Messenger ' : 'Already have an account '}
                    <span className={'text-muted-foreground cursor-pointer underline'} onClick={toggleVariant}>
                        {variant ==='signin' ? 'Create an account' : 'Sign in to your account'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
