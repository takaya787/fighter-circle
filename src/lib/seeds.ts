import { Dynamode } from 'dynamode';
import { UserTableManager } from '@/lib/table/userTable';

// const dynamoDB = new DynamoDB({
//     endpoint: process.env.DYNODB_ENDPOINT,
// });

// // describeTableを実行する関数
// async function canDescribeTable(tableName: string): Promise<boolean> {
//     try {
//         console.log('canDescribeTable', 'start');
//         const response = await dynamoDB.describeTable({ TableName: tableName });
//         console.log('Table description:', response.Table);
//         return true;
//     } catch (error) {
//         console.log(error);
//         if (error instanceof Error && error.name === 'ResourceNotFoundException') {
//             return false;
//         }
//         throw error;
//     }
// }

// const createUserTableIfNotExists = async () => {
//     try {
//         // テーブルの存在確認
//         const result = await canDescribeTable(process.env.USER_TABLE_NAME!);

//         if (!result) {
//             // await UserTableManager.createTable();
//         }
//     } catch (error) {
//         throw error;
//     }
// };

(async () => {
    Dynamode.ddb.local('http://localhost:8000');
    try {
        await UserTableManager.createTable();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1); // エラーコードを返してプロセスを終了
    }
})();
