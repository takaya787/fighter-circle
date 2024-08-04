declare namespace NodeJS {
    // 環境変数名の定義
    interface ProcessEnv {
        readonly AWS_REGION: string;
        readonly AWS_ACCESS_KEY_ID: string;
        readonly AWS_SECRET_ACCESS_KEY: string;
    }
}
