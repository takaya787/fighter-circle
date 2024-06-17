import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/lib/client';

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
    const id = event.pathParameters!.id;

    // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
    const params = {
        TableName: tableName,
        Key: { id: id },
    };

    let items: Record<string, any> | undefined = undefined;

    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        items = data.Item;
    } catch (err) {
        console.log('Error', err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
