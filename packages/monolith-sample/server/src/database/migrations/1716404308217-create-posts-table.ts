import { type Kysely, sql } from 'kysely';

import type { Database } from '../types';

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS unaccent;`.execute(db);

  await db.schema
    .createTable('posts')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
    )
    .addColumn('text', 'text', col => col.notNull())
    .addColumn('createdBy', 'uuid', col =>
      col.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('createdAt', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('posts').execute();
  await sql`DROP EXTENSION IF EXISTS unaccent;`.execute(db);
}
