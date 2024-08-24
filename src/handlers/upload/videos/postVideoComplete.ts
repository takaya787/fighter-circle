import { completeMultipartUpload } from '@/lib/s3';
import { getCurrentUser } from '@/lib/auth';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateResponse } from '@/lib/response';

export const postVideoComplete = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
        const { uploadId, key, completedParts } = body;
        console.debug(completedParts);
        await completeMultipartUpload(uploadId, key, completedParts);

        return generateResponse(201, JSON.stringify({ key: key, uploadId: uploadId }));
    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return generateResponse(401, JSON.stringify({ message: 'User not exists', user_id: userId }));
        }
        throw error; // その他のエラーはそのままスロー
    }
};
