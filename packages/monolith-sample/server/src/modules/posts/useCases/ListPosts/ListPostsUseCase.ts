import type { ListPostsDTO } from '../../dtos/ListPostsDTO';
import type { IPostsRepository } from '../../repositories/IPostsRepository';

export class ListPostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ currentUserId, search }: ListPostsDTO) {
    return this.postsRepository.list({ currentUserId, search });
  }
}
