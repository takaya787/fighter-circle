// Import getByIdHandler function from get-by-id.mjs
import { putItemHandler } from '@/handler/putItem';
// Import dynamodb from aws-sdk
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';

// This includes all tests for getByIdHandler()
describe('Test getByIdHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    // This test invokes putItemHandler() and compare the result
    it('should add id to the table', async () => {
        const returnedItem = { id: 'id1', name: 'name1' };

        // Return the specified value whenever the spied put function is called
        ddbMock.on(PutCommand).resolves({});

        const event = {
            httpMethod: 'POST',
            body: '{"id": "id1","name": "name1"}',
        } as unknown as APIGatewayProxyEvent;

        // Invoke putItemHandler()
        const result = await putItemHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(returnedItem),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
