import attribute from 'dynamode/decorators';
import { UserTable, UserTableManager, UserTableProps, UserTablePrimaryKey } from '@/lib/table/userTable';

type UserVideoProps = UserTableProps & {
    s3Key: string;
    format: FormatString;
    viewCount: number;
};

type FormatString = 'mp4' | 'webp';

export class UserVideo extends UserTable {
    @attribute.sortKey.string({ prefix: UserVideo.name })
    sk!: string;

    @attribute.string()
    userId: string;

    @attribute.string()
    s3Key: string;

    @attribute.string()
    format: FormatString;

    @attribute.number()
    viewCount: number;

    constructor(props: UserVideoProps) {
        super(props);

        this.userId = props.pk;
        this.s3Key = props.s3Key;
        this.format = props.format;
        this.viewCount = props.viewCount;
    }

    static getPrimaryKey(userId: string, userVideoId: string): UserTablePrimaryKey {
        return {
            pk: userId,
            sk: userVideoId,
        };
    }
}

export const UserVideoRepository = UserTableManager.entityManager(UserVideo);
