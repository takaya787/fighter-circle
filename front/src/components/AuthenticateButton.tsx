'use client';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';

// ログインボタン
export const LoginButton = () => {
    return (
        <button onClick={() => signIn()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            サインイン
        </button>
    );
};

// ログアウトボタン
export const LogoutButton = () => {
    return (
        <button
            className="border border-grey-500 text-grey-500 hover:bg-grey-100 font-bold mx-4 py-2 px-4 rounded"
            onClick={() => signOut()}
        >
            サインアウト
        </button>
    );
};
