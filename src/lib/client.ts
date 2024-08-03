import { DynamoDB } from '@aws-sdk/client-dynamodb';

import Dynamode from 'dynamode/dynamode';

export const dynamodeDBClient = process.env.AWS_SAM_LOCAL
    ? Dynamode.ddb.local('http://host.docker.internal:8000')
    : Dynamode.ddb.set(
          new DynamoDB({
              region: 'ap-northeast-1',
              credentials: {
                  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                  accessKeyId: 'accessKeyId',
                  secretAccessKey: 'secretAccessKey',
              },
          }),
      );
