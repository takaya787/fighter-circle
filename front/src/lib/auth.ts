import axios from 'axios';
import { AuthOptions, getServerSession } from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CognitoProvider({
            idToken: true,
            clientId: process.env.USER_POOL_CLIENT_ID,
            clientSecret: process.env.USER_POOL_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
            checks: 'nonce',
            httpOptions: {
                // timeoutは10秒
                timeout: 100000,
            },
            //checks: 'nonce'がないとサインインできるけどエラーが起きて別のアカウントで試せと言われる
        }),
    ],

    callbacks: {
        async signIn({ user, profile }) {
            console.log('SignIn Callback');
            console.log(user);
            console.log(profile);

            const isGoogleIdentity =
                profile &&
                profile?.identities &&
                profile.identities.some((identity) => identity.providerName === 'Google');

            console.log('From Google Auth: ', isGoogleIdentity);

            await axios.post('http://localhost:3000/auth/sign_up', {
                id: user.id,
                email: user.email,
                preferred_username: profile?.preferred_username ?? 'not_name',
                email_verified: profile!.email_verified,
            });

            return true;
        },

        async session({ session, token }) {
            return {
                ...session,
                bearerToken: token.bearerToken,
            };
        },
        async jwt({ token, account }) {
            token.bearerToken = account?.id_token ?? token.bearerToken;
            return token;
        },
    },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
