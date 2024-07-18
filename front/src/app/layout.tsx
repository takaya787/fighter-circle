import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getSession } from '@/lib/auth';
import { Menu } from 'lucide-react';
import { BottomNavigation } from '@/components/BottomNavigation';
import NextAuthProvider from '@/providers/NextAuth';
import SnackbarProvider from '@/providers/SnackbarProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FighterCircle',
    description: `Let's join FighterCircle and enjoy sharing your fighting video! `,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    return (
        <html lang="ja">
            <body className={inter.className}>
                <NextAuthProvider session={session}>
                    <header className="bg-red-600 text-white p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">FighterCircle</h1>
                        <Menu className="w-6 h-6" />
                    </header>
                    <SnackbarProvider>
                        {children}
                        <BottomNavigation />
                    </SnackbarProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
