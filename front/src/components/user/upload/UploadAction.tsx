'use server';

// サーバーアクションの定義
export async function prepareMultipartUpload({
    userId,
    fileName,
    fileSize,
}: {
    userId: string;
    fileName: string;
    fileSize: number;
}): Promise<any> {
    const response = await fetch(`/api/users/${userId}/videos`, {
        method: 'POST',
        body: JSON.stringify({ fileName, fileSize }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

// export async function tagPartner(partnerId: string): Promise<ServerActionResult> {
//     // パートナーのタグ付け処理を実装

//     return {
//         success: true,
//         message: 'Partner tagged successfully!',
//     };
// }

// export async function createChallenge(challengeData: any): Promise<ServerActionResult> {
//     // チャレンジ作成処理を実装

//     return {
//         success: true,
//         message: 'Challenge created successfully!',
//     };
// }
