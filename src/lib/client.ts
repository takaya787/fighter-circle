import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient(
    process.env.AWS_SAM_LOCAL
        ? {
              region: 'ap-northeast-1',
              endpoint: 'http://docker.for.mac.localhost:8000',
              credentials: {
                  accessKeyId: '',
                  secretAccessKey: '',
              },
          }
        : {},
);
export const ddbDocClient = DynamoDBDocumentClient.from(client);
