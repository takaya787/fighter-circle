import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserRepository, User } from '@/lib/entity/user/user';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const putItemHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    // console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body ?? '');
    console.log('parse_json');
    try {
        const newUser = await UserRepository.put(
            new User({
                ...User.getPrimaryKey(body.id.toString()),
                email: 'test3@email.com',
                isVerified: true,
            }),
        );
        console.log('Success - item added or updated', JSON.stringify(newUser));
    } catch (err) {
        console.log('Error', err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
