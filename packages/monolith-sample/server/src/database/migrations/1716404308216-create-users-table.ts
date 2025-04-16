import { type Kysely, sql } from 'kysely';

import type { Database } from '../types';

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`.execute(db);

  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
    )
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('email', 'varchar(255)', col => col.notNull())
    .addColumn('passwordHash', 'varchar(255)', col => col.notNull())
    .addColumn('createdAt', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('users').execute();
  await sql`DROP EXTENSION IF EXISTS "uuid-ossp";`.execute(db);
}
