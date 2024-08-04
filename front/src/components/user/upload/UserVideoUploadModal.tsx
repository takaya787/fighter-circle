'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { DynamodbFetcher } from '@/service/DynamodbFetcher';
import { FileSizeValidator } from '@/lib/fileSizeValidator';
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { LoadingScreen } from '@/components/LoadingScreen';
import { UploadButton } from '@/components/user/upload/UploadButton';
import { VideoPreview } from '@/components/user/upload/VideoPreview';
import { useSnackbar } from '@/providers/SnackbarProvider';

// コンポーネントの型定義
type UploadStage = 'select' | 'preview' | 'uploading' | 'completed';

export const UserVideoUploadModal: React.FC<{ userId: string; token: string }> = ({ userId, token }) => {
    const router = useRouter();
    const addSnackbar = useSnackbar();
    const [uploadStage, setUploadStage] = useState<UploadStage>('select');

    const [localVideo, setLocalVideo] = useState<File | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState(1);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const MAX_FILE_SIZE = 1000 * 1024 * 1024; // 1GB in bytes

    const validator = new FileSizeValidator(MAX_FILE_SIZE);

    const dynamodbFetcher = new DynamodbFetcher(token);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setErrorMessage('');
        if (acceptedFiles && acceptedFiles[0]) {
            if (validator.isTooLarge(acceptedFiles[0])) {
                setErrorMessage('1GMまでの動画を選択してください。');
                setLocalVideo(undefined);
                return;
            }
            setLocalVideo(acceptedFiles[0]);
        }
    }, []);

    const { uploadVideo } = useVideoUpload(
        userId,
        useCallback(
            (progress: number) => {
                setUploadProgress(progress);
            },
            [setUploadProgress]
        )
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const handleLocalVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('');
        const files = e.currentTarget.files;
        if (files && files[0]) {
            if (validator.isTooLarge(files[0])) {
                setErrorMessage('1GMまでの動画を選択してください。');
                setLocalVideo(undefined);
                return;
            }
            setLocalVideo(files[0]);
        }
    };

    const handleSelectFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!localVideo) {
            console.error('No file selected');
            return;
        }
        setUploadStage('uploading');

        try {
            const { key, format } = await uploadVideo(localVideo);

            await dynamodbFetcher.post(`/users/${userId}/user_videos`, { key: key, format: format });
            addSnackbar({
                key: 'Upload Complete',
                text: `Upload Completed! file_name: ${localVideo.name}`,
                variant: 'success',
            });
            router.refresh();
        } catch (error) {
            addSnackbar({ variant: 'error', text: 'Uploadに失敗しました。', key: 'FailedVideoUpload' });
            console.error('Upload failed:', error);
        }

        setUploadStage('completed');
    };

    const handleRemoveVideo = () => {
        setLocalVideo(undefined);
        setErrorMessage('');
        setUploadStage('select');
    };

    useEffect(() => {
        if (localVideo) {
            setUploadStage('preview');
        }
    }, [localVideo, setUploadStage]);

    return (
        <div className="p-4 flex items-center max-h-screen md:h-screen">
            <div className="bg-gray-100 rounded-lg shadow-md w-full max-h-screen max-w-4xl mx-auto flex flex-col justify-center min-h-[500px]">
                <div className="md:w-2/3 p-4 border-b mx-auto ">
                    <h1 className="text-xl font-bold text-center">
                        {uploadStage === 'completed' ? 'あなたの頑張りが共有されました！' : '頑張りを共有しよう!'}
                    </h1>
                </div>

                {/* Main Content */}
                <form onSubmit={handleSubmit}>
                    <div className=" md:w-2/3 p-4 flex flex-col justify-between mx-auto max-h-full">
                        {localVideo === undefined && uploadStage === 'select' && (
                            <div
                                {...getRootProps()}
                                className={`flex flex-col gap-1 border-dashed border-2 py-6 px-4 rounded-md text-center w-full items-center justify-center
                ${isDragActive ? 'bg-gray-300 border-blue-400' : 'border-gray-300'}`}
                            >
                                <Upload
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                    color={`${isDragActive ? 'rgb(59 130 246)' : '#718096'}`}
                                />
                                <p className="text-sm gray-500 mb-1">ファイルを Drag & Dropしてください。</p>
                                <p className="text-sm text-red-400 mb-4">ファイルの上限は1GBまでです。</p>

                                <input
                                    {...getInputProps()}
                                    ref={fileInputRef}
                                    name="file"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleLocalVideo}
                                    className="hidden"
                                />
                                <UploadButton primary onClick={handleSelectFileClick}>
                                    Select Video
                                </UploadButton>
                            </div>
                        )}

                        {localVideo && uploadStage === 'preview' && (
                            <>
                                <VideoPreview video={localVideo} />
                                <div className="flex items-center justify-start gap-2 mt-3">
                                    <p className="text-sm line-clamp-1 overflow-hidden">
                                        Selected file: {localVideo.name}
                                    </p>
                                    <button
                                        className="grid p-0.5 rounded-full bg-gray-700 text-white my-2 hover:bg-gray-500"
                                        onClick={() => handleRemoveVideo()}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                                <button
                                    className="px-4 py-2 rounded-full text-sm font-medium bg-red-600 text-white"
                                    type="submit"
                                >
                                    Upload
                                </button>
                            </>
                        )}

                        {uploadStage === 'uploading' && (
                            <LoadingScreen text="只今、upload中です" progress={uploadProgress} />
                        )}

                        <p className="text-sm text-red-500 my-2">{errorMessage}</p>

                        {/* Footer */}
                        {/* <div className="p-4 border-t">
                        {uploadStage === 'select' ? (
                            <Button type="button" onClick={() => setUploadStage('preview')}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit">Upload Video</Button>
                        )}
                    </div> */}
                    </div>
                </form>
            </div>
        </div>
    );
};
