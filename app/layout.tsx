import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Toaster} from "@/components/ui/toaster";
import {ThemeProvider} from "@/components/theme-provider";
import {cn} from "@/lib/utils";
import {ClerkProvider} from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Lux Messenger',
    description: 'Encrypted messaging for everyone',
    manifest: '/manifest.json',
    themeColor: '#3A82F6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={cn('bg-background',inter.className)}>
            <ClerkProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
                <Toaster />
            </ClerkProvider>
        </body>
        </html>
  )
}
