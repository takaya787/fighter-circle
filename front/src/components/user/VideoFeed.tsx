import { getFetcher } from '@/service/fetcher';
import { fetchCloudFrontUrl } from '@/lib/utlis';
import { VideoScreenWithSkeleton } from '@/components/user/VideoScreenWithSkeleton';

interface VideoFeedProps {
    path: string;
    idToken: string;
}

export const VideoFeed = async ({ idToken, path }: VideoFeedProps) => {
    const videos = await getFetcher(path, idToken).then((data) => {
        return data ? data['videos'] : [];
    });

    return (
        <>
            <section className="w-full my-4">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Featured Video</h2>

                {videos.length > 0 && (
                    <VideoScreenWithSkeleton s3Path={fetchCloudFrontUrl(videos[0].s3path)} forSkeleton={false} />
                )}
            </section>

            <section className="w-full">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recent Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {videos.length > 0 &&
                        videos.map((video: any, i: number) => (
                            <div
                                key={video.sk}
                                className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center bg-white"
                            >
                                <VideoScreenWithSkeleton
                                    s3Path={fetchCloudFrontUrl(video.s3path)}
                                    forSkeleton={false}
                                />
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
};
