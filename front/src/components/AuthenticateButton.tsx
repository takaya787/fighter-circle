'use client';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';

// ログインボタン
export const LoginButton = () => {
    return (
        <button
            onClick={() => signIn()}
            className="mt-4 bg-blue-500 hover:bg-blue-300 active:scale-90 transition-all duration-200 text-white py-2 px-4 rounded-full mx-auto"
        >
            サインイン
        </button>
    );
};

// ログアウトボタン
export const LogoutButton = () => {
    return (
        <button
            className="mt-4 bg-red-500 hover:bg-red-300 active:scale-90 transition-all duration-200 text-white py-2 px-4 rounded-full mx-auto"
            onClick={() => signOut()}
        >
            サインアウト
        </button>
    );
};
