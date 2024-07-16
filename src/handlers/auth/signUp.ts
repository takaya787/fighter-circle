import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserRepository, User } from '@/lib/entity/user/user';
import { handleDynamoDBError } from '@/lib/entity/errorHandler';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const signUpHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const body = JSON.parse(event.body ?? '');
    console.log('parse_json', body);
    try {
        const newUser = await UserRepository.create(
            new User({
                ...User.getPrimaryKey(body.id.toString()),
                email: body.email,
                username: body.preferred_username ?? undefined,
                isVerified: body.email_verified,
            }),
        );
        console.log('Success - item added or updated');

        const response = {
            statusCode: 200,
            body: JSON.stringify(newUser),
        };

        return response;
    } catch (err) {
        const dynamodeError = handleDynamoDBError(err);
        if (!dynamodeError) {
            console.log('Info', `Existing User. USER_ID:${body.id.toString()}`);
            return {
                statusCode: 204,
                body: '',
            };
        }

        console.log('Error', err);

        const response = {
            statusCode: 500,
            body: JSON.stringify({ message: `Failed to sign Up User. USER_ID:${body.id.toString()}` }),
        };
        return response;
    }
};
