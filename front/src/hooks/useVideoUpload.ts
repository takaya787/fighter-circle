import { CompletedPart } from '@aws-sdk/client-s3';
import axios from 'axios';
import { sleep } from '@/lib/utlis';

const PART_SIZE = 10 * 1024 * 1024; // 10 MB

export const useVideoUpload = (userId: string, setUploadProgress: (progress: number) => void) => {
    const uploadVideo = async (file: File) => {
        const fileName = file.name;
        const fileSize = file.size;

        setUploadProgress(1);
        const response = await axios.post(
            `/api/users/${userId}/videos`,
            { fileName, fileSize },
            { headers: { 'Content-Type': 'application/json' } }
        );
        setUploadProgress(10);

        if (response.status !== 201) {
            throw new Error(response.data.error);
        }

        const { key, uploadId, presignedUrls } = response.data;
        const uploadedCompletedParts = await uploadParts(file, presignedUrls);
        await completeUpload(uploadId, key, uploadedCompletedParts);
    };

    const uploadParts = async (file: File, presignedUrls: string[]) => {
        const uploadedParts: CompletedPart[] = [];
        const parts = await createFileParts(file, presignedUrls);

        for (let i = 0; i < parts.length; i += 5) {
            const chunk = parts.slice(i, i + 5);
            await Promise.all(
                chunk.map(async ({ partData, url, partNumber }) => {
                    const result = await uploadPart(partData, url, partNumber);
                    uploadedParts.push(result);
                })
            );

            await sleep(1000);

            const uploadPercentage = Math.min(Math.ceil(((i + 5) / parts.length) * 100), 100);
            setUploadProgress(uploadPercentage);
        }

        return uploadedParts;
    };

    const readFilePart = (fileBlob: Blob, offset: number): Promise<Uint8Array> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && e.target.result) {
                    const data = new Uint8Array(e.target.result as ArrayBuffer);
                    resolve(data);
                    reader.abort();
                } else {
                    reject(new Error('Failed to read file part'));
                }
            };

            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };

            const slice = fileBlob.slice(offset, offset + PART_SIZE, fileBlob.type);
            reader.readAsArrayBuffer(slice);
        });
    };

    const createFileParts = async (
        file: File,
        presignedUrls: string[]
    ): Promise<Array<{ partData: Uint8Array; url: string; partNumber: number }>> => {
        const parts = [];
        for (let i = 0; i < presignedUrls.length; i++) {
            const data = await readFilePart(file, i * PART_SIZE);
            parts.push({ partData: data, url: presignedUrls[i], partNumber: i + 1 });
        }
        return parts;
    };

    const uploadPart = async (part: Uint8Array, url: string, partNumber: number): Promise<CompletedPart> => {
        try {
            const response = await axios.put(url, part, {
                headers: { 'Content-Type': 'application/octet-stream' },
            });

            const etag = response.headers['etag'];
            if (!etag) {
                throw new Error('ETag header not found in the response');
            }

            return {
                ETag: etag.replace(/"/g, ''),
                PartNumber: partNumber,
            };
        } catch (error) {
            console.error(`Error uploading part to ${url}:`, error);
            throw error;
        }
    };

    const completeUpload = async (uploadId: string, key: string, completedParts: CompletedPart[]) => {
        try {
            const res = await axios.post(
                `/api/users/${userId}/videos/complete`,
                { uploadId, key, completedParts },
                { headers: { 'Content-Type': 'application/json' } }
            );
            return res;
        } catch (error) {
            console.error(`Error complete Multipart upload:`, error);
            throw error;
        }
    };

    return { uploadVideo };
};
