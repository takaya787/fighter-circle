import { jwtDecode } from 'jwt-decode';

export const getJwtDecoded = (
    authorization: string,
): {
    [name: string]: string;
} => {
    const decoded = jwtDecode<{ [name: string]: string } & { email_verified: boolean }>(authorization);

    return decoded;
};
