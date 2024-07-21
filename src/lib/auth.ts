import { jwtDecode } from 'jwt-decode';

export type CurrentUser = {
    pk: string;
    preferred_username?: string;
    email: string;
    email_verified: boolean;
};

export const getCurrentUser = (authorization: string): CurrentUser => {
    const decodedInfo = jwtDecode<{ [name: string]: string } & { email_verified: boolean }>(authorization);

    return {
        pk: decodedInfo['sub'],
        preferred_username: decodedInfo['preferred_username'],
        email: decodedInfo['email'],
        email_verified: decodedInfo['email_verified'],
    };
};
