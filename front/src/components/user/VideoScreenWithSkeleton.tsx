'use client';

import { Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react';

interface VideoScreenProps {
    s3Path: string;
    forSkeleton: boolean;
}

export const VideoScreenWithSkeleton: React.FC<VideoScreenProps> = ({ s3Path, forSkeleton }) => {
    return (
        <Card className="w-full max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-grey-600">
            <CardBody>
                <Typography variant="h6" color="blue-gray" className="text-center mb-4">
                    {forSkeleton ? 'Loading Video...' : 'Video Player'}
                </Typography>
                <div className="relative w-full pb-[56.25%]">
                    {forSkeleton ? (
                        <>{skeletonView()}</>
                    ) : (
                        <video className="absolute top-0 left-0 w-full h-full rounded-md" controls preload="auto">
                            <source src={s3Path} type="video/mp4" />
                        </video>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

const skeletonView = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-lg overflow-hidden">
            <div className="animate-pulse flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <div className="h-2 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    );
};
