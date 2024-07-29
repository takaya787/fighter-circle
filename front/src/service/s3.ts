import {
    CompleteMultipartUploadCommand,
    CompletedPart,
    CreateMultipartUploadCommand,
    S3Client,
    UploadPartCommand,
} from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// envファイルで環境変数を設定していることを確認
const credential = fromEnv();
const s3Client = new S3Client({ region: process.env.AWS_REGION, credentials: credential });

const bucketFileKey = (userId: string, fileName: string) => `user_videos/${userId}/${fileName}`;

export const createMultipartUpload = async (userId: string, fileName: string) => {
    const key = bucketFileKey(userId, fileName);
    const createMultipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: process.env.USER_VIDEO_BUCKET_NAME,
        Key: key,
    });

    const multipartUploadData = await s3Client.send(createMultipartUploadCommand);
    return multipartUploadData;
};

export const getPresignedUrls = async (uploadId: string, key: string, partNumber: number) => {
    const uploadPartCommand = new UploadPartCommand({
        Bucket: process.env.USER_VIDEO_BUCKET_NAME,
        Key: key,
        UploadId: uploadId,
        PartNumber: partNumber,
    });

    const presignedUrl = await getSignedUrl(s3Client, uploadPartCommand, { expiresIn: 3600 });

    return presignedUrl;
};

export const completeMultipartUpload = async (uploadId: string, key: string, uploadedParts: CompletedPart[]) => {
    const sortedParts = uploadedParts.sort((a, b) => a.PartNumber! - b.PartNumber!);

    const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
        Bucket: process.env.USER_VIDEO_BUCKET_NAME,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: sortedParts,
        },
    });

    await s3Client.send(completeMultipartUploadCommand);
};
