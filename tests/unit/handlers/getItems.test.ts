// Import getAllItemsHandler function from get-all-items.mjs
import { getItemsHandler } from '@/handlers/getItems';
// Import dynamodb from aws-sdk
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { APIGatewayProxyEvent } from 'aws-lambda';

// This includes all tests for getAllItemsHandler()
describe('Test getAllItemsHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    it('should return ids', async () => {
        const items = [{ id: 'id1' }, { id: 'id2' }];

        // Return the specified value whenever the spied scan function is called
        ddbMock.on(ScanCommand).resolves({
            Items: items,
        });

        const event = {
            httpMethod: 'GET',
            path: '/items',
        } as APIGatewayProxyEvent;

        // Invoke helloFromLambdaHandler()
        const result = await getItemsHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(items),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
