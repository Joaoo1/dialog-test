import type { IPostsRepository } from '../../repositories/IPostsRepository';

export class ListPostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(userId?: string) {
    return this.postsRepository.list(userId);
  }
}
