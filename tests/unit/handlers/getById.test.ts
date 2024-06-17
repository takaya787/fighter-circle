// Import getByIdHandler function from get-by-id.mjs
import { getByIdHandler } from '@/handler/getById';
// Import dynamodb from aws-sdk
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';

// This includes all tests for getByIdHandler()
describe('Test getByIdHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    // This test invokes getByIdHandler() and compare the result
    it('should get item by id', async () => {
        const item = { id: 'id1' };

        // Return the specified value whenever the spied get function is called
        ddbMock.on(GetCommand).resolves({
            Item: item,
        });

        const event = {
            httpMethod: 'GET',
            path: '/items/id1',
            pathParameters: {
                id: 'id1',
            },
        } as unknown as APIGatewayProxyEvent;

        // Invoke getByIdHandler()
        const result = await getByIdHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(item),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
