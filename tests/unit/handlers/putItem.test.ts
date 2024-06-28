// Import getByIdHandler function from get-by-id.mjs
import { putItemHandler } from '@/handlers/putItem';

import { UserRepository, User } from '@/lib/entity/user/user';

import { APIGatewayProxyEvent } from 'aws-lambda';

const mockedDate = new Date();
const testID = 'id1';
const putUser = new User({
    ...User.getPrimaryKey('user_' + testID),
    email: 'test3@email.com',
    isVerified: true,
    createdAt: mockedDate,
    updatedAt: mockedDate,
});

describe('Test putByIdHandler', () => {
    const putUserRepositoryMock = jest.spyOn(UserRepository, 'put').mockResolvedValue(putUser as never);
    const event = {
        httpMethod: 'POST',
        body: JSON.stringify({ id: testID, name: 'name1' }),
    } as unknown as APIGatewayProxyEvent;

    beforeAll(() => {
        // 現在時刻をモック化
        jest.useFakeTimers().setSystemTime(mockedDate);
    });
    beforeEach(() => {
        putUserRepositoryMock.mockClear();
    });

    afterAll(() => {
        // 現在時刻のモック化を解除
        jest.useRealTimers();
    });

    // This test invokes putItemHandler() and compare the result
    it('should call repository collectly', async () => {
        const result = await putItemHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify({ id: testID, name: 'name1' }),
        };

        expect(putUserRepositoryMock).toHaveBeenCalledWith(putUser);

        expect(result).toEqual(expectedResult);
    });
});
