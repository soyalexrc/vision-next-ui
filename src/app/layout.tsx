import React from 'react';
import {Metadata} from 'next';
import '@/styles/globals.css';
import 'keen-slider/keen-slider.min.css';
import {Inter} from 'next/font/google';
import {cn} from "@/lib/utils";

const inter = Inter({subsets: ['latin'], variable: "--font-sans"});

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>
        <main className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable
        )}>
            {children}
        </main>
        </body>
        </html>
    );
}
