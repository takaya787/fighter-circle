import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserRepository, User } from '@/lib/entity/user/user';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const deleteByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters!.id;
    if (event.httpMethod !== 'DELETE' || !id) {
        throw new Error(`postMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    try {
        const data = await UserRepository.delete(User.getPrimaryKey(id));
        console.log('Success - item deleted', data);
    } catch (err) {
        console.log('Error', err);
    }

    const response = {
        statusCode: 204,
        body: '',
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
