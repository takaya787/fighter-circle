import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { User, UserRepository } from '@/lib/entity/user/user';
import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';
import { v4 as uuidv4 } from 'uuid';
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

    try {
        await UserRepository.get(primaryKey);
    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'User not exists', user_id: userId }),
            };
        }
        throw error; // その他のエラーはそのままスロー
    }

    const newVideo = await UserVideoRepository.create(
        new UserVideo({
            ...UserVideo.getPrimaryKey(userId, uuidv4()),
            videoPath: 'videoPathSample',
            format: 'mp4',
            viewCount: 0,
        }),
    );
    console.log('Success - item added or updated', JSON.stringify(newVideo));

    const response = {
        statusCode: 200,
        body: JSON.stringify(newVideo),
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
