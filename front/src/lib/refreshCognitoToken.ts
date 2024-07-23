import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { JWT } from 'next-auth/jwt';

export const refreshCognitoToken = async (token: JWT): Promise<JWT> => {
    const client = new CognitoIdentityProviderClient({ region: process.env.aws_region });

    const command = new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: process.env.USER_POOL_CLIENT_ID,
        AuthParameters: {
            REFRESH_TOKEN: token.refreshToken!,
            SECRET_HASH: process.env.USER_POOL_CLIENT_SECRET,
        },
    });

    try {
        const response = await client.send(command);

        console.debug('Token updated!');
        return {
            ...token,
            idToken: response.AuthenticationResult?.IdToken,
            accessToken: response.AuthenticationResult?.AccessToken,
            accessTokenExpires: Date.now() + response.AuthenticationResult?.ExpiresIn! * 1000,
            refreshToken: token.refreshToken,
        };
    } catch (error) {
        console.error('Error refreshing token:', error);
        return {
            ...token,
        };
    }
};
