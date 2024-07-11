import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { User, UserRepository } from '@/lib/entity/user/user';
import { UserVideoRepository, UserVideo } from '@/lib/entity/user/userVideo';
import { Condition } from 'dynamode';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const incrementUserVideoCountHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.log('called', event.pathParameters);

    const userId = event.pathParameters!.user_id as string;
    const userVideoId = event.pathParameters!.user_video_id as string;

    const userPrimaryKey = User.getPrimaryKey(userId);

    try {
        await UserRepository.get(userPrimaryKey);
    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'User not exists', user_id: userId }),
            };
        }
        throw error; // その他のエラーはそのままスロー
    }

    const videoPrimaryKey = UserVideo.getPrimaryKey(userId, userVideoId);

    try {
        const newVideo = await UserVideoRepository.get(videoPrimaryKey);

        const video = await UserVideoRepository.put(
            new UserVideo({
                ...newVideo,
                videoPath: 'edited videoPathSample',
                viewCount: newVideo.viewCount + 5,
                updatedAt: undefined,
            }),
            {
                condition: UserVideoRepository.condition().attribute('pk').exists(),
            },
        );

        // const video = await UserVideoRepository.update(videoPrimaryKey, {
        //     increment: {
        //         viewCount: 1,
        //     },
        // });

        const response = {
            statusCode: 200,
            body: JSON.stringify(video),
        };

        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

        return response;
    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Video not exists', user_id: userId }),
            };
        }
        throw error; // その他のエラーはそのままスロー
    }
};
