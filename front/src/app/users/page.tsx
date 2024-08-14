import React, { Suspense } from 'react';
import { getSession } from '@/lib/auth';
import { LogoutButton } from '@/components/AuthenticateButton';
import { VideoFeed } from '@/components/user/VideoFeed';
import { VideoScreenWithSkeleton } from '@/components/user/VideoScreenWithSkeleton';

export default async function Users() {
    const session = await getSession();

    const videoSkeletonRows = () => {
        return [...Array(2)].map((_: undefined, idx: number) => (
            <div
                key={`skeleton_${idx}`}
                className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center bg-white"
            >
                <Suspense fallback={<VideoScreenWithSkeleton s3Path={''} forSkeleton={true} />}>
                    <VideoScreenWithSkeleton s3Path="" forSkeleton={true} />
                </Suspense>
            </div>
        ));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-6 lg:p-8 xl:p-24 max-w-7xl mx-auto w-full">
            <LogoutButton />

            <Suspense
                fallback={
                    <>
                        <section className="w-full my-4">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Featured Video</h2>
                            <VideoScreenWithSkeleton s3Path={''} forSkeleton={true} />
                        </section>
                        <section className="w-full">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recent Videos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {videoSkeletonRows()}
                            </div>
                        </section>
                    </>
                }
            >
                <VideoFeed idToken={session?.idToken!} path={'/user_videos'} />
            </Suspense>
        </main>
    );
}
