'use client';

import React from 'react';

export const UploadButton = ({
    children,
    primary,
    onClick,
    type,
}: {
    children: React.ReactNode;
    primary: boolean;
    onClick: VoidFunction;
    type?: 'submit' | 'reset' | 'button';
}) => (
    <button
        className={`px-4 py-2 rounded-full text-sm font-medium ${
            primary ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={onClick}
        // type={type}
    >
        {children}
    </button>
);
