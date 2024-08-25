import { APIGatewayProxyResult } from 'aws-lambda';

export const generateResponse = (statusCode: number, jsonBody: string): APIGatewayProxyResult => {
    const response = {
        headers: {
            'Access-Control-Allow-Headers': '*',
            // 'Access-Control-Allow-Origin': '*',
            // Allow-Originはprod環境ではセキュリティーのために、ドメインを固定する
            'Access-Control-Allow-Origin': process.env.AWS_SAM_LOCAL ? '*' : process.env.CORS_ALLOW_ORIGIN!,
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE',
            'Access-Control-Allow-Credentials': true,
        },
        statusCode: statusCode,
        body: jsonBody,
    };

    return response;
};
