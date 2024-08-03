import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getSession } from '@/lib/auth';
import { HeaderMenu } from '@/components/HeaderMenu';
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
                    <HeaderMenu />
                    <SnackbarProvider>
                        {children}
                        {session?.user && <BottomNavigation userId={session?.user.id!} />}
                    </SnackbarProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
