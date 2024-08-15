import { DynamoDB } from '@aws-sdk/client-dynamodb';

import Dynamode from 'dynamode/dynamode';

// Local以外ではIAM Roleから認証情報を取得する
export const dynamodeDBClient = process.env.AWS_SAM_LOCAL
    ? Dynamode.ddb.local('http://host.docker.internal:8000')
    : Dynamode.ddb.get();
