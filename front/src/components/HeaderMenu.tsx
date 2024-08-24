'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Menu, PlusSquare, Search, User } from 'lucide-react';

export const HeaderMenu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className="bg-red-600 text-white p-4 flex justify-between items-center">
            <Link href="/">
                <h1 className="text-2xl font-bold">FighterCircle</h1>
            </Link>

            <div className="relative">
                <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
                {isMenuOpen && (
                    <ul className="absolute right-0 mt-2 bg-white text-black p-2 shadow-lg rounded-lg">
                        <li>
                            <Link
                                href="/users"
                                className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                                onClick={toggleMenu}
                            >
                                <Home className="w-6 h-6" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/search"
                                className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                                onClick={toggleMenu}
                            >
                                <Search className="w-6 h-6" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/upload"
                                className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                                onClick={toggleMenu}
                            >
                                <PlusSquare className="w-6 h-6" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className="p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full inline-block"
                                onClick={toggleMenu}
                            >
                                <User className="w-6 h-6" />
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};
