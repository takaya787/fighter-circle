'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSnackbar } from '@/providers/SnackbarProvider';

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { data, status } = useSession({
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
    const addSnackbar = useSnackbar();

    useEffect(() => {
        if (status === 'authenticated') {
            addSnackbar({
                key: 'Authenticated',
                text: `Welcome to FighterCircle! ${data.user?.email}`,
                variant: 'success',
            });
        }
    }, [status]);

    return <>{children}</>;
};
