import axios from 'axios';
import { AuthOptions, getServerSession } from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
import { refreshCognitoToken } from './refreshCognitoToken';

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
            // user dataを同期させる
            // await axios.post('http://localhost:3000/auth/sign_up', {
            //     id: user.id,
            //     email: user.email,
            //     preferred_username: profile?.preferred_username ?? 'not_name',
            //     email_verified: profile!.email_verified,
            // });

            return true;
        },

        async session({ session, token }) {
            return {
                ...session,
                idToken: token.idToken,
                refreshToken: token.refreshToken,
                accessTokenExpires: token.accessTokenExpires,
                user: token.user,
            };
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                console.debug('Initial Login With POST Request');
                return {
                    idToken: account.id_token,
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at,
                    refreshToken: account.refresh_token,

                    user,
                };
            }

            if (token && token.accessTokenExpires! < Date.now()) {
                return refreshCognitoToken(token);
            }

            console.debug('token is alive');
            console.debug('Next Expires: ', new Date(token.accessTokenExpires!));
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
