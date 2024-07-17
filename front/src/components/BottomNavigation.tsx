import React from 'react';
import Link from 'next/link';
import { Home, Search, PlusSquare, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
            <ul className="flex justify-around py-2">
                <li>
                    <Link
                        href="/"
                        className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                    >
                        <Home className="w-6 h-6" />
                    </Link>
                </li>
                <li>
                    <Link
                        href="/search"
                        className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                    >
                        <Search className="w-6 h-6" />
                    </Link>
                </li>
                <li>
                    <Link
                        href="/upload"
                        className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                    >
                        <PlusSquare className="w-6 h-6" />
                    </Link>
                </li>
                <li>
                    <Link
                        href="/profile"
                        className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                    >
                        <User className="w-6 h-6" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
