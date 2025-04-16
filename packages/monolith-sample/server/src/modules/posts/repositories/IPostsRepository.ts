import type { Insertable } from "kysely";
import type { PostsTable } from "../../../database/types";
import type { Post } from "../entities/Post";

export interface IPostsRepository {
	findById(id: string): Promise<Post | null>;
	create(postData: Insertable<PostsTable>): Promise<Post>;
	delete(id: string, createdBy: string): Promise<boolean>;
}
