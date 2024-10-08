import { Suspense } from 'react';
import { getSession } from '@/lib/auth';
import { UserVideoUploadModal } from '@/components/user/upload/UserVideoUploadModal';

export default async function UserVideoUpload() {
    const session = await getSession();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {session?.user.id && <UserVideoUploadModal userId={session.user.id} token={session.idToken!} />}
        </Suspense>
    );
}
