export default async function RoutesLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className={"md:pl-20 h-full"}>
                {children}
            </div>
        </>
    )
}
