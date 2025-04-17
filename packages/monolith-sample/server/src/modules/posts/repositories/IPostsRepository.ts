import type { Insertable } from 'kysely';
import type { PostsTable } from '../../../database/types';
import type { Post } from '../entities/Post';

export interface ListPost {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  likesCount: number;
  likedByUser: boolean;
}

export interface ListProps {
  currentUserId?: string;
  search?: string;
}

export interface IPostsRepository {
  list(props: ListProps): Promise<ListPost[]>;
  findById(id: string): Promise<Post | null>;
  create(postData: Insertable<PostsTable>): Promise<Post>;
  delete(id: string, createdBy: string): Promise<boolean>;
}
