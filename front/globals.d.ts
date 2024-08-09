declare namespace NodeJS {
    // 環境変数名の定義
    interface ProcessEnv {
        readonly USER_POOL_CLIENT_ID: string;
        readonly USER_POOL_CLIENT_SECRET: string;
        readonly USER_POOL_ID: string;
        readonly COGNITO_ISSUER: string;

        readonly NEXTAUTH_URL: string;
        readonly NEXTAUTH_SECRET: string;

        readonly AWS_REGION: string;
        readonly AWS_ACCESS_KEY_ID: string;
        readonly AWS_SECRET_ACCESS_KEY: string;
        readonly USER_VIDEO_BUCKET_NAME: string;
        readonly CLOUD_FRONT_URL: string;
    }
}
