import { Progress } from '@material-tailwind/react';
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingModalProps {
    text: string;
    progress: number;
}

export const LoadingScreen: React.FC<LoadingModalProps> = ({ text, progress }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
            <Loader className="animate-spin text-blue-500 mx-auto mb-4" size={48} />
            <p className="text-lg font-semibold mb-4">{text}</p>
            <div className="w-full bg-grey-700">
                <Progress value={progress} className="w-full" color="blue" label={'done'} />
            </div>
        </div>
    </div>
);
