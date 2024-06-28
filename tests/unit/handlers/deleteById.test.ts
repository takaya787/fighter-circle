import { deleteByIdHandler } from '@/handlers/deleteById';

import { UserRepository, User } from '@/lib/entity/user/user';

import { APIGatewayProxyEvent } from 'aws-lambda';

const testID = 'id1';

describe('Test deleteByIdHandler', () => {
    const deletedUser = new User({
        ...User.getPrimaryKey('user_' + testID),
        email: 'test3@email.com',
        isVerified: true,
    });

    const deleteUserRepositoryMock = jest.spyOn(UserRepository, 'delete').mockImplementation();
    beforeEach(() => {
        deleteUserRepositoryMock.mockClear();
    });

    // This test invokes deleteByIdHandler() and compare the result
    it('should get item by id', async () => {
        const event = {
            httpMethod: 'DELETE',
            path: '/items/id1',
            pathParameters: {
                id: 'id1',
            },
        } as unknown as APIGatewayProxyEvent;

        const result = await deleteByIdHandler(event);

        expect(deleteUserRepositoryMock).toHaveBeenCalledWith(User.getPrimaryKey(event.pathParameters!.id ?? ''));

        const expectedResult = {
            statusCode: 204,
            body: '',
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
