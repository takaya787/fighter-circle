import { S3Event } from 'aws-lambda';
import { MediaConvert } from 'aws-sdk';
import { removeKeyExtention } from '@/lib/extentionFormatter';

// https://dev.classmethod.jp/articles/mediaconvert-s3-auto-convert-cfn/
// 上記の記事をtsに変換

export const lambdaHandler = async (event: S3Event): Promise<void> => {
    console.debug('EVENT: ' + JSON.stringify(event));
    console.log('EVENT: ' + JSON.stringify(event));

    if (process.env.NODE_ENV !== 'production') {
        console.log('Env: ' + JSON.stringify(process.env));
    }

    await enqueueMediaConvertJob(event);
};

const enqueueMediaConvertJob = async (event: S3Event) => {
    const endpointUrl = process.env.ENDPOINT_URL!;
    const outputBucket = process.env.OUTPUT_BUCKET!;
    const mediaConvertJobTemplateArn = process.env.MEDIA_CONVERT_JOB_TEMPLATE_ARN!;
    const mediaConvertRoleArn = process.env.MEDIA_CONVERT_ROLE_ARN!;
    const mediaConvertQue = process.env.MEDIA_CONVERT_QUE!;

    const mediaconvert = new MediaConvert({ region: 'ap-northeast-1', endpoint: endpointUrl });

    const s3InputBucket = event.Records[0].s3.bucket.name;
    const s3Key = event.Records[0].s3.object.key;
    const inputFile = `s3://${s3InputBucket}/${s3Key}`;

    const outputFile = `s3://${outputBucket}/${removeKeyExtention(s3Key)}`;

    try {
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

const jobSettings = {
    OutputGroups: [
        {
            Name: 'File Group',
            OutputGroupSettings: {
                Type: 'FILE_GROUP_SETTINGS',
                FileGroupSettings: {
                    Destination: '',
                },
            },
        },
    ],
    Inputs: [
        {
            AudioSelectors: {
                'Audio Selector 1': {
                    DefaultSelection: 'DEFAULT',
                },
            },
            FileInput: '',
            TimecodeSource: 'ZEROBASED',
        },
    ],
};
