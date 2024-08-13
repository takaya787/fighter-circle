import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { match } from 'path-to-regexp';
import { deleteByIdHandler } from './deleteById';
import { dynamodeDBClient } from '@/lib/client';

// handlers
import { getItemsHandler } from '@/handlers/getItems';
import { getByIdHandler } from '@/handlers/getById';
import { putItemHandler } from '@/handlers/putItem';
import {
    putUserVideoHandler,
    getUserVideoByIdHandler,
    getUserVideosHandler,
    incrementUserVideoCountHandler,
    getUserVideoFeedHandler,
} from '@/handlers/user_videos';
import { signUpHandler } from '@/handlers/auth/signUp';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    dynamodeDBClient;

    const path = event.path;
    const method = event.httpMethod;

    // ルーティング定義
    const routes: Array<{
        method: string;
        path: string;
        handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
    }> = [
        {
            method: 'GET',
            path: '/user_videos',
            handler: getUserVideoFeedHandler,
        },
        {
            method: 'PUT',
            path: '/users/:user_id/user_videos/:user_video_id/increment',
            handler: incrementUserVideoCountHandler,
        },
        { method: 'GET', path: '/users/:user_id/user_videos/:user_video_id', handler: getUserVideoByIdHandler },
        { method: 'GET', path: '/users/:user_id/user_videos', handler: getUserVideosHandler },
        { method: 'POST', path: '/users/:user_id/user_videos', handler: putUserVideoHandler },
        { method: 'GET', path: '/users/:id', handler: getByIdHandler },
        { method: 'POST', path: '/users', handler: putItemHandler },
        { method: 'GET', path: '/items', handler: getItemsHandler },
        { method: 'GET', path: '/items/:id', handler: getByIdHandler },
        { method: 'POST', path: '/items', handler: putItemHandler },
        { method: 'DELETE', path: '/items/:id', handler: deleteByIdHandler },
        { method: 'POST', path: '/auth/sign_up', handler: signUpHandler },
    ];

    // ルーティングロジック
    for (const route of routes) {
        const matchPath = match(route.path, { decode: decodeURIComponent });
        const matched = matchPath(path);

        if (method === route.method && matched) {
            return await route.handler(event);
        }
    }

    // どのルートにもマッチしない場合のレスポンス
    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
    };
};
