'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ReactNode } from 'react';

const NextAuthProvider = ({ session, children }: { session: Session | null; children: ReactNode }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
