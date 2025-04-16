import { type Kysely, sql } from "kysely";
import type { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
	await db.schema
		.createTable("posts_likes")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
		)
		.addColumn("postId", "uuid", (col) =>
			col.notNull().references("posts.id").onDelete("cascade"),
		)
		.addColumn("userId", "uuid", (col) =>
			col.notNull().references("users.id").onDelete("cascade"),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.addUniqueConstraint("unique_post_like", ["postId", "userId"])
		.execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
	await db.schema.dropTable("posts_likes").execute();
}
