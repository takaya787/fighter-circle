// Import getByIdHandler function from get-by-id.mjs
import { getByIdHandler } from '@/handlers/getById';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { UserRepository, User } from '@/lib/entity/user/user';

const test_id = 'user_id_1';
const mockedDate = new Date();
const mockedAllUser = new User({
    ...User.getPrimaryKey(test_id),
    email: 'test3@email.com',
    isVerified: true,
    createdAt: mockedDate,
    updatedAt: mockedDate,
});

describe('Test getByIdHandler', () => {
    // This test invokes getByIdHandler() and compare the result
    const queryUserRepositoryMock = jest.spyOn(UserRepository, 'get').mockResolvedValue(mockedAllUser as never);

    const event = {
        httpMethod: 'GET',
        path: '/items/' + test_id,
        pathParameters: {
            id: test_id,
        },
    } as unknown as APIGatewayProxyEvent;

    beforeAll(() => {
        // 現在時刻をモック化
        jest.useFakeTimers().setSystemTime(mockedDate);
    });
    beforeEach(() => {
        queryUserRepositoryMock.mockClear();
    });

    afterAll(() => {
        // 現在時刻のモック化を解除
        jest.useRealTimers();
    });

    it('should get item by id', async () => {
        const result = await getByIdHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(mockedAllUser),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });

    it('should call UserRepository.get', async () => {
        await getByIdHandler(event);

        expect(queryUserRepositoryMock).toHaveBeenCalledWith(User.getPrimaryKey(test_id));
        expect(queryUserRepositoryMock).toHaveBeenCalledTimes(1);
    });
});
