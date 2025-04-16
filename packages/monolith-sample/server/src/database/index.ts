import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { env } from '../env';
import type { Database as DatabaseTypes } from './types';

const createDbInstance = () => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: env.DB_NAME,
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASS,
      port: Number(env.DB_PORT),
      max: 10,
    }),
  });

  return new Kysely<DatabaseTypes>({
    dialect,
  });
};

export const db = createDbInstance();
