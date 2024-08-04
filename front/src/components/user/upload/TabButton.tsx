'use client';

import React from 'react';

export const TabButton = ({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: VoidFunction;
}) => (
    <button
        className={`px-4 py-2 text-sm font-medium ${
            active ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-600'
        }`}
        onClick={onClick}
    >
        {children}
    </button>
);
