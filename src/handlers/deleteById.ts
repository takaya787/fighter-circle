import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/lib/client';

// Get the DynamoDB table name from environment variables
const tableName = 'SampleTable';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const deleteByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`postMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const id = event.pathParameters!.id;

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    const params = {
        TableName: tableName,
        Key: { id: id },
    };

    try {
        const data = await ddbDocClient.send(new DeleteCommand(params));
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
