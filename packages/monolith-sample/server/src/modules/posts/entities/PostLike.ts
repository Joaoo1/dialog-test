import type { BaseEntity } from '../../../common/BaseEntity';

export interface PostLike extends BaseEntity {
  postId: string;
  userId: string;
}
