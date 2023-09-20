import Image from 'next/image'
import AuthForm from "@/components/auth-form";

export default function AuthPage() {
    return (
        <div className={"flex flex-col min-h-full justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 to-background"}>
            <div className={'bg-background/70 sm:w-full sm:max-w-md p-5 rounded-xl w-11/12 md:w-9/12 mx-auto border-4 border-primary/10 shadow-2xl'}>
                <Image alt={'Logo'} height={'48'} width={'48'} className={'mx-auto w-auto'} src={'/logo.png'}/>
                <AuthForm/>
            </div>
        </div>
    )
}
