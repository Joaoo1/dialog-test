import type { ColumnType } from "kysely";

export interface Database {
	users: UsersTable;
}

interface BaseTable {
	id: ColumnType<string, never, never>;
	createdAt: ColumnType<Date, string | undefined, never>;
}

export interface UsersTable extends BaseTable {
	name: string;
	email: string;
	passwordHash: string;
}
