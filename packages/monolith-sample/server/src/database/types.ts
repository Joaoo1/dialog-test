import type { ColumnType } from 'kysely';

export interface Database {
  users: UsersTable;
  posts: PostsTable;
  posts_likes: PostsLikesTable;
}

interface BaseTable {
  id: ColumnType<string, never, never>;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export interface UsersTable extends BaseTable {
  name: string;
  email: string;
  passwordHash: string;
}

export interface PostsTable extends BaseTable {
  text: string;
  createdBy: string;
}

export interface PostsLikesTable extends BaseTable {
  postId: string;
  userId: string;
}
