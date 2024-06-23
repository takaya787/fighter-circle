import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getItemsHandler } from '@/handlers/getItems';
import { getByIdHandler } from '@/handlers/getById';
import { putItemHandler } from '@/handlers/putItem';
import { match } from 'path-to-regexp';
import { deleteByIdHandler } from './deleteById';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const path = event.path;
    const method = event.httpMethod;

    // ルーティング定義
    const routes: Array<{
        method: string;
        path: string;
        handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
    }> = [
        { method: 'GET', path: '/items', handler: getItemsHandler },
        { method: 'GET', path: '/items/:id', handler: getByIdHandler },
        { method: 'POST', path: '/items', handler: putItemHandler },
        { method: 'DELETE', path: '/items/:id', handler: deleteByIdHandler },
    ];

    // ルーティングロジック
    for (const route of routes) {
        const matchPath = match(route.path, { decode: decodeURIComponent });
        const matched = matchPath(path);

        if (method === route.method && matched) {
            // // パスパラメータがある場合はそれを event.pathParameters に設定
            // if (matched.params && typeof matched.params === 'object') {
            //     event.pathParameters = matched.params as { [key: string]: string };
            // }
            return await route.handler(event);
        }
    }

    // どのルートにもマッチしない場合のレスポンス
    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
    };
};
