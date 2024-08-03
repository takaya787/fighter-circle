import React from 'react';

interface VideoPreviewProps {
    video: File;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ video }) => {
    const previewUrl = URL.createObjectURL(video);

    return (
        <div className="relative w-full pb-[56.25%]">
            <video
                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg shadow-lg"
                controls
                preload="none"
            >
                <source src={previewUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
