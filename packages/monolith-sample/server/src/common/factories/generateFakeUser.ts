import { faker } from '@faker-js/faker';
import type { Insertable } from 'kysely';

import { db } from '../../database';
import type { UsersTable } from '../../database/types';
import { Bcrypt } from '../libs/Hasher';

export async function generateFakeUser(password?: string) {
  const hasher = new Bcrypt();
  const hash = await hasher.hash(password || faker.internet.password());

  const user: Insertable<UsersTable> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: hash,
  };

  const [createdUser] = await db
    .insertInto('users')
    .values(user)
    .returningAll()
    .execute();

  return createdUser;
}
