import { NextRequest, NextResponse } from 'next/server';
import { createMultipartUpload, getPresignedUrls } from '@/service/s3';
import { getSession } from '@/lib/auth';

const PARTSIZE = 10 * 1024 * 1024; //10 MB

export async function POST(req: NextRequest, { params }: { params: { user_id: string } }) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const userId = params.user_id;

    const session = await getSession();
    if (!session || session.user.id !== userId) {
        return NextResponse.json({ error: 'User not allowed' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { fileName, fileSize } = body;

        const multipartUploadData = await createMultipartUpload(userId, fileName);
        const { UploadId, Key: key } = multipartUploadData;

        const partsCount = calculateParts(fileSize);

        const presignedUrls = await Promise.all(
            Array.from({ length: partsCount }, (_, index) => getPresignedUrls(UploadId!, key!, index + 1))
        );

        return NextResponse.json(
            {
                key: key,
                uploadId: UploadId,
                presignedUrls,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating multipart upload or getting presigned URLs:', error);
        return NextResponse.json({ error: 'Failed to create multipart upload or get presigned URLs' }, { status: 405 });
    }
}

const calculateParts = (fileSize: number) => Math.ceil(fileSize / PARTSIZE);
