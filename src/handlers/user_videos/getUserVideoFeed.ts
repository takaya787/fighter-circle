import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';
import { generateResponse } from '@/lib/response';
import { convertKeyExtention } from '@/lib/extentionFormatter';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getUserVideoFeedHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    // const startKey = event.pathParameters!.start_key;

    let videos: UserVideo[] = [];
    let last_key: any;

    try {
        const res = await UserVideoRepository.query()
            .partitionKey('dynamodeEntity')
            .eq(UserVideo.name)
            .sort('ascending')
            .run();

        console.debug({ res });

        last_key = res.lastKey;
        videos = res.items.map((v) => {
            return { ...v, s3path: convertKeyExtention(v.s3Key) };
        });
    } catch (err) {
        console.log('Error', err);
        throw err;
    }

    return generateResponse(200, JSON.stringify({ videos: videos, last_key: last_key }));
};
