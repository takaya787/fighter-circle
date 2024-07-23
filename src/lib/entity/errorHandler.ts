import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

export class DynamodbClientError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'DynamodbClientError';
    }
}

export const handleDynamoDBError = (err: unknown): DynamodbClientError | null => {
    if (err instanceof DynamoDBServiceException) {
        switch (err.name) {
            // 200系
            case 'ConditionalCheckFailedException':
                return null;
            case 'NotFountError':
                return new DynamodbClientError(404, 'Resource not found.');
            case 'ProvisionedThroughputExceededException':
                return new DynamodbClientError(503, 'Provisioned throughput exceeded.');
            case 'InternalServerError':
                return new DynamodbClientError(500, 'Internal server error.');
            default:
                return new DynamodbClientError(500, `Unexpected error: ${err.message}`);
        }
    } else {
        throw err;
    }
};
