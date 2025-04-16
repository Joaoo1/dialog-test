import type { Insertable } from "kysely";
import { db } from "../../../database";
import type { PostsTable } from "../../../database/types";
import type { Post } from "../entities/Post";
import type { IPostsRepository } from "./IPostsRepository";

export class PostsRepository implements IPostsRepository {
	async create(postData: Insertable<PostsTable>): Promise<Post> {
		const [createdPost] = await db
			.insertInto("posts")
			.values(postData)
			.returningAll()
			.execute();

		return createdPost;
	}

	async findById(id: string): Promise<Post | null> {
		const post = await db
			.selectFrom("posts")
			.where("id", "=", id)
			.selectAll()
			.executeTakeFirst();

		if (!post) {
			return null;
		}

		return post;
	}
}
