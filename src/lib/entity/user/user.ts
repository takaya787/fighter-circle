import attribute from 'dynamode/decorators';
import { UserTable, UserTableManager, UserTableProps, UserTablePrimaryKey } from '@/lib/table/userTable';

type UserProps = UserTableProps & {
    email: string;
    isVerified: boolean;
    username?: string;
};

export class User extends UserTable {
    @attribute.sortKey.string({ prefix: User.name }) // `User#${userId}`
    sk!: string;

    @attribute.string()
    userId: string;

    @attribute.string()
    email: string;

    @attribute.boolean()
    isVerified: boolean;

    @attribute.string()
    username?: string;

    @attribute.object()
    config: {
        isAdmin: boolean;
    };

    constructor(props: UserProps) {
        super(props);

        this.userId = props.pk;
        this.email = props.email;
        this.isVerified = props.isVerified;
        this.username = props.username;
        this.config = {
            isAdmin: false,
        };
    }

    static getPrimaryKey(userId: string): UserTablePrimaryKey {
        return {
            pk: userId,
            sk: userId,
        };
    }
}

export const UserRepository = UserTableManager.entityManager(User);
