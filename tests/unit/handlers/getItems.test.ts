// Import getAllItemsHandler function from get-all-items.mjs
import { getItemsHandler } from '@/handlers/getItems';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { UserRepository, User } from '@/lib/entity/user/user';

const mockedDate = new Date();
const mockedAllUsers = [...Array(10).keys()].map(
    (id) =>
        new User({
            ...User.getPrimaryKey('user_' + id),
            email: 'test3@email.com',
            isVerified: true,
            createdAt: mockedDate,
            updatedAt: mockedDate,
        }),
);

// This includes all tests for getAllItemsHandler()
describe('Test getAllItemsHandler', () => {
    const mockedPartionKey = jest.fn().mockReturnThis();
    const mockedEq = jest.fn().mockReturnThis();
    const mockedRun = jest.fn().mockResolvedValue({ items: mockedAllUsers });

    const queryUserRepositoryMock = jest.spyOn(UserRepository, 'query').mockImplementation((): any => {
        return {
            partitionKey: mockedPartionKey,
            eq: mockedEq,
            run: mockedRun,
        };
    });

    const event = {
        httpMethod: 'GET',
        path: '/items',
    } as APIGatewayProxyEvent;

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

    it('should return users', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/items',
        } as APIGatewayProxyEvent;

        const result = await getItemsHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(mockedAllUsers),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });

    it('should call repository', async () => {
        await getItemsHandler(event);

        expect(queryUserRepositoryMock).toHaveBeenCalledTimes(1);

        expect(mockedPartionKey).toHaveBeenCalledWith('dynamodeEntity');
        expect(mockedEq).toHaveBeenCalledWith(User.name);
        expect(mockedRun).toHaveBeenCalledTimes(1);
    });
});
