import attribute from 'dynamode/decorators';
import Entity from 'dynamode/entity';
import TableManager from 'dynamode/table';

export const USER_TABLE_NAME = 'user-development';
export const DYNAMODE_INDEX = 'dynamode-index';

export type UserTablePrimaryKey = {
    pk: string;
    sk: string;
};

export type UserTableProps = UserTablePrimaryKey & {
    createdAt?: Date;
    updatedAt?: Date;
};

export class UserTable extends Entity {
    @attribute.partitionKey.string()
    pk: string;

    @attribute.sortKey.string()
    sk: string;

    @attribute.gsi.partitionKey.string({ indexName: DYNAMODE_INDEX })
    dynamodeEntity!: string;

    @attribute.gsi.sortKey.string({ indexName: DYNAMODE_INDEX })
    gsi_sk_1: string;

    @attribute.date.string()
    createdAt: Date;

    @attribute.date.string()
    updatedAt: Date;

    constructor(props: UserTableProps) {
        super(props);

        this.pk = props.pk;
        this.sk = props.sk;

        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();

        this.gsi_sk_1 = this.createdAt.toISOString();
    }
}

export const UserTableManager = new TableManager(UserTable, {
    tableName: USER_TABLE_NAME,
    partitionKey: 'pk',
    sortKey: 'sk',
    indexes: {
        [DYNAMODE_INDEX]: {
            partitionKey: 'dynamodeEntity',
            sortKey: 'gsi_sk_1',
        },
    },
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
