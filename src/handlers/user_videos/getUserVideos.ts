import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';
import { User, UserRepository } from '@/lib/entity/user/user';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getUserVideosHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    const userId = event.pathParameters!.user_id as string;

    let user: User;
    let videos: UserVideo[] = [];

    try {
        user = await UserRepository.get(User.getPrimaryKey(userId));

        videos = (
            await UserVideoRepository.query()
                .partitionKey('pk')
                .eq(userId)
                .condition()
                .attribute('dynamodeEntity')
                .eq(UserVideo.name)
                .run()
        ).items;
    } catch (err) {
        console.log('Error', err);
        throw err;
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({ user: user, videos: videos, total_count: videos.length }),
    };

    return response;
};
