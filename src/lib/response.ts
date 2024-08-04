import { APIGatewayProxyResult } from 'aws-lambda';

export const generateResponse = (statusCode: number, jsonBody: string): APIGatewayProxyResult => {
    const response = {
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE',
        },
        statusCode: statusCode,
        body: jsonBody,
    };

    return response;
};
