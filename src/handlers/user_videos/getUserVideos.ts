import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getUserVideosHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    const userId = event.pathParameters!.user_id as string;

    let videos: UserVideo[] = [];

    try {
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
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({ videos: videos, total_count: videos.length }),
    };

    return response;
};
