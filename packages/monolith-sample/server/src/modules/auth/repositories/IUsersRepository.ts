import type { Insertable } from "kysely";
import type { UsersTable } from "../../../database/types";
import type { User } from "../entities/User";

export interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
	create(userData: Insertable<UsersTable>): Promise<User>;
}
