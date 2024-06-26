import { DynamoDBClient, DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import Dynamode from 'dynamode/dynamode';

const client = new DynamoDBClient(
    process.env.AWS_SAM_LOCAL
        ? {
              region: 'ap-northeast-1',
              endpoint: 'http://host.docker.internal:8000',
              credentials: {
                  accessKeyId: 'accessKeyId',
                  secretAccessKey: 'secretAccessKey',
              },
          }
        : {},
);
export const ddbDocClient = DynamoDBDocumentClient.from(client);

export const dynamodeDBClient = process.env.AWS_SAM_LOCAL
    ? Dynamode.ddb.local('http://host.docker.internal:8000')
    : Dynamode.ddb.set(
          new DynamoDB({
              region: 'ap-northeast-1',
              credentials: {
                  accessKeyId: 'accessKeyId',
                  secretAccessKey: 'secretAccessKey',
              },
          }),
      );
