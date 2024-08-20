import { PostConfirmationTriggerEvent } from 'aws-lambda';
import { UserRepository, User } from '@/lib/entity/user/user';
import { dynamodeDBClient } from '@/lib/client';
import { handleDynamoDBError } from '@/lib/entity/errorHandler';

// https://dev.classmethod.jp/articles/mediaconvert-s3-auto-convert-cfn/
// 上記の記事をtsに変換

export const lambdaHandler = async (event: PostConfirmationTriggerEvent): Promise<PostConfirmationTriggerEvent> => {
    if (process.env.ENVIRONMENT !== 'prod') {
        console.log({ event });
        console.log('本番環境以外ではユーザーの同期はskipします');
        return event;
    }

    const { userAttributes } = event.request;

    console.log('userAttributes', userAttributes);

    await registerUserInDB(userAttributes);

    return event;
};

const registerUserInDB = async (userAttributes: PostConfirmationTriggerEvent['request']['userAttributes']) => {
    const data = {
        id: userAttributes['sub'],
        email: userAttributes['email'],
        username: userAttributes['preferred_username'] ?? undefined,
        isVerified: userAttributes['email_verified'] === 'true',
    };

    try {
        dynamodeDBClient;
        await UserRepository.create(
            new User({
                ...User.getPrimaryKey(data.id),
                email: data.email,
                username: data.username,
                isVerified: data.isVerified,
            }),
        );

        console.log('Success - User confirmed');
    } catch (err) {
        const dynamodeError = handleDynamoDBError(err);
        if (!dynamodeError) {
            console.log('Info', `Existing User. USER_ID:${data.id}`);
        }

        console.log('Error', err);
    }
};
