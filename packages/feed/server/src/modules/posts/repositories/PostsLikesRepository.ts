import type { Insertable } from 'kysely';
import { db } from '../../../database';
import type { PostsLikesTable } from '../../../database/types';
import type { PostLike } from '../entities/PostLike';
import type { IPostsLikesRepository } from './IPostsLikesRepository';

export class PostsLikesRepository implements IPostsLikesRepository {
  async create(likeData: Insertable<PostsLikesTable>): Promise<PostLike> {
    const [createdLike] = await db
      .insertInto('posts_likes')
      .values(likeData)
      .returningAll()
      .execute();

    return createdLike;
  }

  async findByPostAndUser(
    postId: string,
    userId: string
  ): Promise<PostLike | null> {
    const like = await db
      .selectFrom('posts_likes')
      .where('postId', '=', postId)
      .where('userId', '=', userId)
      .selectAll()
      .executeTakeFirst();

    return like || null;
  }

  async delete(postId: string, userId: string): Promise<boolean> {
    const result = await db
      .deleteFrom('posts_likes')
      .where('postId', '=', postId)
      .where('userId', '=', userId)
      .executeTakeFirst();

    return !!result.numDeletedRows;
  }
}
