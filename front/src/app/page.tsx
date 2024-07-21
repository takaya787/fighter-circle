'use client';
import React from 'react';
import Link from 'next/link';
import { Video, Users, Share2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { LoginButton } from '@/components/AuthenticateButton';

const LISTS = [
    {
        icon: Video,
        title: '動画共有',
        description: 'スパーリングやトレーニング動画を簡単に共有。技の向上を視覚的に確認できます。',
    },
    {
        icon: Users,
        title: 'コミュニティ',
        description: '同じ志を持つ仲間とつながり、互いに高め合える環境を提供します。',
    },
    {
        icon: Share2,
        title: 'フィードバック',
        description: '経験豊富な格闘家や指導者からアドバイスをもらい、技術を磨けます。',
    },
];

const Home = () => {
    const { status } = useSession();
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <main className="flex-grow p-4 space-y-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-red-500">格闘技愛好家のためのSNS</h2>
                    <p className="text-gray-600 mt-1">スパーリング動画の共有と学びの場</p>
                    <p className="mt-4">
                        FighterCircleは、格闘技を愛する人々のためのコミュニティです。トレーニングの成果を共有し、仲間とつながりましょう。
                    </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    {status === 'authenticated' && (
                        <>
                            <h3 className="text-center text-xl font-semibold text-red-700 mb-4">
                                あなたの頑張りを世界に発信しよう！
                            </h3>
                            <div className="flex justify-center">
                                <Link
                                    href="/upload"
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
                                >
                                    ビデオを投稿する
                                </Link>
                            </div>
                        </>
                    )}

                    {status === 'unauthenticated' && (
                        <>
                            {' '}
                            <p className="text-center text-red-700 mb-4">
                                今すぐ参加して、あなたの格闘技の旅を次のレベルへ！
                            </p>
                            <div className="flex justify-center">
                                <LoginButton />
                            </div>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {LISTS.map((feature, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-6">
                            <h3 className="flex items-center text-lg font-semibold mb-2">
                                <feature.icon className="mr-2 text-red-500" size={24} />
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
