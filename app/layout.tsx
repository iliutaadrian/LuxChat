import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Toaster} from "@/components/ui/toaster";
import AuthContext from "@/context/AuthContext";
import {ThemeProvider} from "@/components/theme-provider";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lux Messenger',
  description: 'Encrypted messaging for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('bg-background',inter.className)}>
        <AuthContext>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </AuthContext>
      </body>
    </html>
  )
}
