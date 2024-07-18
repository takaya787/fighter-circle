'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import React from 'react';
export default function isLoggedIn() {
    const { data: session } = useSession();

    useEffect(() => {
        // console.log(session?.bearerToken);
    });

    if (!session) {
        return <p>ログインしていません。</p>;
    }

    return (
        <div className="max-w-lg">
            {session.user ? `${session.user.email}としてログインしています。` : '読み込み中...'}
            <p>{session.bearerToken ? `token exists` : 'No Token'}</p>
        </div>
    );
}
