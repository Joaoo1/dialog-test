import type { Insertable, Updateable } from 'kysely';
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

  async findById(id: string): Promise<User | null> {
    const user = await db
      .selectFrom('users')
      .where('id', '=', id)
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

  async update(
    id: string,
    userData: Partial<Updateable<UsersTable>>
  ): Promise<User> {
    const [updatedUser] = await db
      .updateTable('users')
      .set(userData)
      .where('id', '=', id)
      .returningAll()
      .execute();

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await db.deleteFrom('users').where('id', '=', id).execute();
  }
}
