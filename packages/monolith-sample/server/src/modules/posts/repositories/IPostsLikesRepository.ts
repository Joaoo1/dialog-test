import type { Insertable } from "kysely";
import type { PostsLikesTable } from "../../../database/types";
import type { PostLike } from "../entities/PostLike";

export interface IPostsLikesRepository {
	create(likeData: Insertable<PostsLikesTable>): Promise<PostLike>;
	findByPostAndUser(postId: string, userId: string): Promise<PostLike | null>;
	delete(postId: string, userId: string): Promise<boolean>;
}
