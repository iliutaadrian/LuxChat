import React from 'react';
import { DesktopSidebar } from '@/components/sidebar/desktop-sidebar';
import { MobileFooter } from '@/components/sidebar/mobile-footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <div className="hidden w-full md:flex flex-col">
                <DesktopSidebar />
            </div>
            {children}
            <MobileFooter />
        </div>
    );
}