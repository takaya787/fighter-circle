import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

interface UserWithId extends DefaultSession['user'] {
    id?: string;
}

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
        idToken?: string;
        accessTokenExpires?;
        number;
        refreshToken?: string;
        user: UserWithId;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        idToken?: string;
        accessToken?: string;
        accessTokenExpires?: number;
        refreshToken?: string;
        user: UserWithId;
    }
}
