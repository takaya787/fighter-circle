declare namespace NodeJS {
    // 環境変数名の定義
    interface ProcessEnv {
        readonly USER_POOL_CLIENT_ID: string;
        readonly USER_POOL_CLIENT_SECRET: string;
        readonly USER_POOL_ID: string;
        readonly COGNITO_ISSUER: string;

        readonly NEXTAUTH_URL: string;
        readonly NEXTAUTH_SECRET: string;
    }
}