import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { User, UserRepository } from '@/lib/entity/user/user';
import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';
import { v4 as uuidv4 } from 'uuid';
import { generateResponse } from '@/lib/response';
/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const putUserVideoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.log('called', event.pathParameters);

    const userId = event.pathParameters!.user_id as string;

    const primaryKey = User.getPrimaryKey(userId);

    const body = JSON.parse(event.body ?? '');

    try {
        await UserRepository.get(primaryKey);
    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return generateResponse(401, JSON.stringify({ message: 'User not exists', user_id: userId }));
        }
        throw error; // その他のエラーはそのままスロー
    }

    const newVideo = await UserVideoRepository.create(
        new UserVideo({
            ...UserVideo.getPrimaryKey(userId, uuidv4()),
            s3Key: body.key,
            format: body.format,
            viewCount: 0,
        }),
    );
    console.log('Success - item added or updated', JSON.stringify(newVideo));

    const response = generateResponse(200, JSON.stringify(newVideo));

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
