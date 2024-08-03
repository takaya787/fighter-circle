'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSnackbar } from '@/providers/SnackbarProvider';

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const addSnackbar = useSnackbar();
    useSession({
        required: true,
        onUnauthenticated() {
            addSnackbar({
                variant: 'warning',
                text: 'You are not authenticated!',
                key: 'UnAuthenticated',
            });

            router.push('/');
        },
    });

    return <>{children}</>;
};
