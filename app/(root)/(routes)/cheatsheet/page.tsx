export default async function CheatSheet() {
    return (
        <div className={'bg-white dark:bg-black grid-cols-2 grid gap-5 p-5 overflow-scroll text-center'}>
            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-background border-2 border-red-600'}/>
                <p>--background: Default background color of &lt;body /&gt;</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-foreground border-2 border-red-600'}/>
                <p>--foreground: Default foreground color</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-card border-2 border-red-600'}/>
                <p>--card: Background color for &lt;Card /&gt;</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-card-foreground border-2 border-red-600'}/>
                <p>--card-foreground: Text color within &lt;Card /&gt;</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-popover border-2 border-red-600'}/>
                <p>--popover: Background color for popovers</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-popover-foreground border-2 border-red-600'}/>
                <p>--popover-foreground: Text color within popovers</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-primary border-2 border-red-600'}/>
                <p>--primary: Primary color for &lt;Button /&gt;</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-primary-foreground border-2 border-red-600'}/>
                <p>--primary-foreground: Text color for primary elements</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-secondary border-2 border-red-600'}/>
                <p>--secondary: Secondary color for &lt;Button /&gt;</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-secondary-foreground border-2 border-red-600'}/>
                <p>--secondary-foreground: Text color for secondary elements</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-muted border-2 border-red-600'}/>
                <p>--muted: Muted background color</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-muted-foreground border-2 border-red-600'}/>
                <p>--muted-foreground: Text color for muted elements</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-accent border-2 border-red-600'}/>
                <p>--accent: Accent color for hover effects</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-accent-foreground border-2 border-red-600'}/>
                <p>--accent-foreground: Text color for accent elements</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-destructive border-2 border-red-600'}/>
                <p>--destructive: Background color for destructive actions</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-destructive-foreground border-2 border-red-600'}/>
                <p>--destructive-foreground: Text color for destructive actions</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-border-2 border-2 border-red-600'}/>
                <p>--border: Default border-2 color</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-input border-2 border-red-600'}/>
                <p>--input: Border color for input elements</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-ring border-2 border-red-600'}/>
                <p>--ring: Color for focus ring</p>
            </div>

            <div className={'flex flex-col items-center'}>
                <div className={'w-10 h-10 bg-radius border-2 border-red-600'}/>
                <p>--radius: Border radius for card, input, and buttons</p>
            </div>
        </div>



    )
}
