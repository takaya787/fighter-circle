import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserRepository, User } from '@/lib/entity/user/user';
import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';
import { generateResponse } from '@/lib/response';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const getUserVideoByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event.pathParameters);

    const userId = event.pathParameters!.user_id as string;
    const userVideoId = event.pathParameters!.user_video_id as string;

    console.log('info:', UserVideo.getPrimaryKey(userId, userVideoId));

    let user: User;
    let video: UserVideo;

    try {
        user = await UserRepository.get(User.getPrimaryKey(userId));

        video = await UserVideoRepository.get(UserVideo.getPrimaryKey(userId, userVideoId));

        console.log('video:', video);
    } catch (err) {
        console.log('Error', err);
        // return {
        // statusCode: 200,
        // body: JSON.stringify({
        //     error : err
        // }),

        return generateResponse(
            500,
            JSON.stringify({
                message: 'Error Happened',
            }),
        );
    }

    const response = generateResponse(
        200,
        JSON.stringify({
            user: user,
            video: video,
        }),
    );

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
