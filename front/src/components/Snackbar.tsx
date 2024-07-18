'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSnackbar } from '@/providers/SnackbarProvider';

export type SnackbarType = {
    key: string; // snackbar identifier
    text: React.ReactNode; //  text to show within snackbar
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // snackbar icon
    variant: 'success' | 'error' | 'warning' | 'info';
};

export type TSnackbarProps = Omit<SnackbarType, 'key'> & {
    handleClose: () => void; // Function that is run when the snackbar is closed
};

const VARIANTS = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
};

export const Snackbar = ({ text, icon: Icon, handleClose, variant }: TSnackbarProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => handleClose(), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`z-50 transition-all duration-300 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
        >
            <div
                className={`${VARIANTS[variant]} flex min-w-[320px] items-center truncate whitespace-nowrap rounded-lg mt-3 mx-1 py-3 px-3.5 text-xs text-white shadow-md`}
            >
                {Icon && <Icon className="w-5 h-5 mr-3 flex-shrink-0" />}
                <span className="flex-grow mr-3">{text}</span>
                <button
                    onClick={handleClose}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200 ml-auto"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
