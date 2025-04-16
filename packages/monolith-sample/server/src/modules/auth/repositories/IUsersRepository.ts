import type { User } from "../entities/User";

export interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
}
