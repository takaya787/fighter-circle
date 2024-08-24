import { createMultipartUpload, getPresignedUrls } from '@/lib/s3';
import { getCurrentUser } from '@/lib/auth';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateResponse } from '@/lib/response';

const PARTSIZE = 10 * 1024 * 1024; //10 MB
const calculateParts = (fileSize: number) => Math.ceil(fileSize / PARTSIZE);

export const postVideoPrepare = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const authorization = event.headers.Authorization;
    const decodedInfo = getCurrentUser(authorization!);
    const userId = decodedInfo.pk;
    const body = JSON.parse(event.body ?? '');

    if (!decodedInfo || !userId) {
        return generateResponse(401, JSON.stringify({ message: 'User not exists', user_id: userId }));
    }

    try {
        const { fileName, fileSize } = body;

        const multipartUploadData = await createMultipartUpload(userId, fileName);
        const { UploadId, Key: key } = multipartUploadData;

        const partsCount = calculateParts(fileSize);

        const presignedUrls = await Promise.all(
            Array.from({ length: partsCount }, (_, index) => getPresignedUrls(UploadId!, key!, index + 1)),
        );

        return generateResponse(201, JSON.stringify({ key: key, uploadId: UploadId, presignedUrls }));
    } catch (error) {
        console.error('Error creating multipart upload or getting presigned URLs:', error);

        return generateResponse(
            401,
            JSON.stringify({ error: 'Failed to create multipart upload or get presigned URLs' }),
        );
    }
};
