import type { Insertable, Updateable } from "kysely";
import type { UsersTable } from "../../../database/types";
import type { User } from "../entities/User";

export interface IUsersRepository {
	findById(email: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(userData: Insertable<UsersTable>): Promise<User>;
	update(id: string, userData: Partial<Updateable<UsersTable>>): Promise<User>;
	delete(id: string): Promise<void>;
}
