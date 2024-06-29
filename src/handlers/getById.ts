import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UserRepository, User } from '@/lib/entity/user/user';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event.path, event.pathParameters);

    const id = event.pathParameters!.id as string;

    let item: User;

    try {
        item = await UserRepository.get(User.getPrimaryKey(id));
    } catch (err) {
        console.log('Error', err);
        item = {} as User; // エラー時の初期化
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(item),
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
