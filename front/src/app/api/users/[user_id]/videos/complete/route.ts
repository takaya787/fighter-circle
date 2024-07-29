import { NextRequest, NextResponse } from 'next/server';
import { completeMultipartUpload } from '@/service/s3';
import { getSession } from '@/lib/auth';

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
        const { uploadId, key, completedParts } = body;
        console.debug(completedParts);

        await completeMultipartUpload(uploadId, key, completedParts);

        return NextResponse.json(
            {
                key: key,
                uploadId: uploadId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error completing upload:', error);
        return NextResponse.json({ error: 'Failed to complete multipart upload' }, { status: 501 });
    }
}
