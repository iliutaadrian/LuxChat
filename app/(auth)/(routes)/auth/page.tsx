import Image from 'next/image'
import AuthForm from "@/components/auth-form";

export default function AuthPage() {
    return (
        <div className={"flex flex-col min-h-full justify-center bg-slate-100"}>
            <div className={'sm:mx-auto sm:w-full sm:max-w-md bg-white p-10 rounded-xl'}>
                <Image alt={'Logo'} height={'48'} width={'48'} className={'mx-auto w-auto'} src={'/logo.png'}/>
                <h1 className={'text-center text-xl font-semibold py-5'}>Sign in to your account</h1>
                <AuthForm/>
            </div>
        </div>
    )
}
