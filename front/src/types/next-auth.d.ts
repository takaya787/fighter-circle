import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Profile {
        email_verified?: boolean;
        identities?: Array<{
            userId: string;
            providerName: string;
            providerType: string;
            primary: string;
            dateCreated: string;
        }>;
        preferred_username?: string;
        name?: string;
    }

    interface Session {
        bearerToken: string;
    }
}
