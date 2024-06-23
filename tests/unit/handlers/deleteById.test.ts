import { deleteByIdHandler } from '@/handlers/deleteById';
// Import dynamodb from aws-sdk
import { DynamoDBDocumentClient, DeleteCommand, DeleteCommandOutput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';

// This includes all tests for getByIdHandler()
describe('Test deleteByIdHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    // This test invokes deleteByIdHandler() and compare the result
    it('should get item by id', async () => {
        const deletedItem = { id: 'id1', name: 'name1' };

        const response = { Attributes: deletedItem };

        // Return the specified value whenever the spied get function is called
        ddbMock.on(DeleteCommand).resolves(response);

        const event = {
            httpMethod: 'DELETE',
            path: '/items/id1',
            pathParameters: {
                id: 'id1',
            },
        } as unknown as APIGatewayProxyEvent;

        const result = await deleteByIdHandler(event);

        const expectedResult = {
            statusCode: 204,
            body: '',
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
