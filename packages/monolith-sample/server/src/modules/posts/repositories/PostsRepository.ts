import { type Insertable, sql } from 'kysely';
import { db } from '../../../database';
import type { PostsTable } from '../../../database/types';
import type { Post } from '../entities/Post';
import type { IPostsRepository, ListPost } from './IPostsRepository';

export class PostsRepository implements IPostsRepository {
  async list(currentUserId: string): Promise<ListPost[]> {
    const posts = await db
      .selectFrom('posts')
      .innerJoin('users', 'users.id', 'posts.createdBy')
      .leftJoin('posts_likes', 'posts_likes.postId', 'posts.id')
      .select([
        'posts.id',
        'posts.text',
        'posts.createdAt',
        'users.name as authorName',
        db.fn.count('posts_likes.id').as('likesCount'),
        sql<boolean>`
				CASE 
				  WHEN EXISTS (
					SELECT 1 FROM posts_likes 
					WHERE "postId" = posts.id AND "userId" = ${currentUserId}
				  ) THEN TRUE
				  ELSE FALSE
				END
			  `.as('likedByUser'),
      ])
      .groupBy(['posts.id', 'users.name'])
      .orderBy('posts.createdAt', 'desc')
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
