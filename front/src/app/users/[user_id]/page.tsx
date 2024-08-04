import React from 'react';
import { getFetcher } from '@/service/fetcher';
import { getSession } from '@/lib/auth';
import { LogoutButton } from '@/components/AuthenticateButton';

export default async function UserHome() {
    const session = await getSession();

    // const userVideos = await getFetcher(`/items`, session?.bearerToken!);

    // console.log(userVideos);

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-6 lg:p-8 xl:p-24 max-w-7xl mx-auto w-full">
            {/* <p>count {userVideos?.length}</p> */}

            <LogoutButton />

            <section className="w-full my-4">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Featured Video</h2>
                <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center w-full max-w-4xl mx-auto">
                    <span className="text-gray-600">Video Player</span>
                </div>
            </section>

            <section className="w-full">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recent Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {[1, 2, 3, 4].map((videoNum) => (
                        <div
                            key={videoNum}
                            className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center"
                        >
                            <span className="text-gray-600">Video {videoNum}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
