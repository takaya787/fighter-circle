import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getJwtDecoded } from '@/lib/auth';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Extract the JWT token from the event
    const authorization = event.headers.Authorization;
    if (!authorization) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Unauthorized from local',
                tableName: process.env.USER_TABLE_NAME,
            }),
        };
    }

    // Decode the JWT token to get user information
    const decodedInfo = getJwtDecoded(authorization);
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
                user_name: decodedInfo['cognito:username'],
                sub: decodedInfo['sub'],
                email: decodedInfo['email'],
                email_verified: decodedInfo['email_verified'],
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
