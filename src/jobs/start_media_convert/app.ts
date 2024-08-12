import { S3Event, Context } from 'aws-lambda';
import { S3, MediaConvert } from 'aws-sdk';
import { removeKeyExtention } from '@/lib/extentionFormatter';

// https://dev.classmethod.jp/articles/mediaconvert-s3-auto-convert-cfn/
// 上記の記事をtsに変換

export const lambdaHandler = async (event: S3Event, context: Context): Promise<void> => {
    console.debug('EVENT: ' + JSON.stringify(event));
    console.log('EVENT: ' + JSON.stringify(event));

    const endpointUrl = process.env.ENDPOINT_URL!;
    const outputBucket = process.env.OUTPUT_BUCKET!;
    const mediaConvertJobTemplateArn = process.env.MEDIA_CONVERT_JOB_TEMPLATE_ARN!;
    const mediaConvertRoleArn = process.env.MEDIA_CONVERT_ROLE_ARN!;
    const mediaConvertQue = process.env.MEDIA_CONVERT_QUE!;

    const mediaconvert = new MediaConvert({ region: 'ap-northeast-1', endpoint: endpointUrl });
    const s3 = new S3();

    const s3InputBucket = event.Records[0].s3.bucket.name;
    const s3Key = event.Records[0].s3.object.key;
    const inputFile = `s3://${s3InputBucket}/${s3Key}`;

    const outputFile = `s3://${outputBucket}/${removeKeyExtention(s3Key)}`;

    console.log('Env: ' + JSON.stringify(process.env));

    try {
        const jobObject = await s3.getObject({ Bucket: s3InputBucket, Key: 'job.json' }).promise();
        const jobSettings = JSON.parse(jobObject.Body!.toString('utf-8'));

        jobSettings.OutputGroups[0].OutputGroupSettings.FileGroupSettings.Destination = outputFile;
        jobSettings.Inputs[0].FileInput = inputFile;

        console.log({ jobSettings });

        const response = await mediaconvert
            .createJob({
                JobTemplate: mediaConvertJobTemplateArn,
                Queue: mediaConvertQue,
                Role: mediaConvertRoleArn,
                Settings: jobSettings,
            })
            .promise();

        console.log('Job created:', response);
    } catch (error) {
        console.error(error);
        console.error(
            `Error getting object ${s3Key} from bucket ${s3InputBucket}. Make sure they exist and your bucket is in the same region as this function.`,
        );
        throw error;
    }
};
