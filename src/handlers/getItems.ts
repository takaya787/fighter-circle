import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UserRepository, User } from '@/lib/entity/user/user';

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getItemsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    let items: User[] = [];

    try {
        items = (await UserRepository.query().partitionKey('dynamodeEntity').eq(User.name).run()).items;
    } catch (err) {
        console.log('Error', err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
    };

    return response;
};
