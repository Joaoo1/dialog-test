import { type Insertable, sql } from 'kysely';
import { db } from '../../../database';
import type { PostsTable } from '../../../database/types';
import type { Post } from '../entities/Post';
import type { IPostsRepository, ListPost, ListProps } from './IPostsRepository';

export class PostsRepository implements IPostsRepository {
  async list({ currentUserId, search }: ListProps): Promise<ListPost[]> {
    const likedByUserSql = currentUserId
      ? sql<boolean>`
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM posts_likes 
            WHERE "postId" = posts.id AND "userId" = ${currentUserId}
          ) THEN TRUE
          ELSE FALSE
        END
      `
      : sql<boolean>`FALSE`;

    let query = db
      .selectFrom('posts')
      .innerJoin('users', 'users.id', 'posts.createdBy')
      .leftJoin('posts_likes', 'posts_likes.postId', 'posts.id')
      .select([
        'posts.id',
        'posts.text',
        'posts.createdAt',
        'users.id as authorId',
        'users.name as authorName',
        db.fn.count('posts_likes.id').as('likesCount'),
        likedByUserSql.as('likedByUser'),
      ]);

    const mSearch = search?.trim();

    if (mSearch) {
      const words = mSearch.split(/\s+/).filter(Boolean);
      for (const word of words) {
        const searchTerm = `%${word}%`;
        const rawSql = sql`(unaccent(posts.text) ILIKE unaccent(${searchTerm}))`;
        query = query.where(rawSql as never);
      }
    }

    const posts = await query
      .orderBy('posts.createdAt', 'desc')
      .groupBy(['posts.id', 'users.name', 'users.id'])
      .execute();

    return posts.map(post => ({
      ...post,
      likesCount: Number(post.likesCount),
    }));
  }

  async create(postData: Insertable<PostsTable>): Promise<Post> {
    const [createdPost] = await db
      .insertInto('posts')
      .values(postData)
      .returningAll()
      .execute();

    return createdPost;
  }

  async findById(id: string): Promise<Post | null> {
    const post = await db
      .selectFrom('posts')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!post) {
      return null;
    }

    return post;
  }

  async delete(id: string, createdBy: string): Promise<boolean> {
    const result = await db
      .deleteFrom('posts')
      .where('id', '=', id)
      .where('createdBy', '=', createdBy)
      .executeTakeFirst();
    return !!result.numDeletedRows;
  }
}
