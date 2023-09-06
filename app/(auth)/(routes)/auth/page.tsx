import Image from 'next/image'
import AuthForm from "@/components/auth-form";

export default function AuthPage() {
    return (
        <div className={"flex flex-col min-h-full sm:justify-center bg-slate-100"}>
            <div className={'sm:w-full sm:max-w-md bg-white p-10 rounded-xl w-9/12 mx-auto mt-10'}>
                <Image alt={'Logo'} height={'48'} width={'48'} className={'mx-auto w-auto'} src={'/logo.png'}/>
                <AuthForm/>
            </div>
        </div>
    )
}
