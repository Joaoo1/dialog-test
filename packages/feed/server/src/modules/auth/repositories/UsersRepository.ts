import type { Insertable } from 'kysely';
import { db } from '../../../database';
import type { UsersTable } from '../../../database/types';
import type { User } from '../entities/User';
import type { IUsersRepository } from './IUsersRepository';

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await db
      .selectFrom('users')
      .where('email', '=', email)
      .selectAll()
      .limit(1)
      .executeTakeFirst();

    if (!user) return null;

    return user;
  }

  async create(userData: Insertable<UsersTable>): Promise<User> {
    const [createdUser] = await db
      .insertInto('users')
      .values(userData)
      .returningAll()
      .execute();

    return createdUser;
  }
}
