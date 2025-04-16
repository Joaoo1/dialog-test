import type { DeletePostDTO } from '../../dtos/DeletePostDTO';
import { PostNotFoundOrNotAllowedError } from '../../errors/PostNotFoundOrNotAllowedError';
import type { IPostsRepository } from '../../repositories/IPostsRepository';

export class DeletePostUseCase {
  constructor(private readonly postsRepository: IPostsRepository) {}

  async execute({ id, createdBy }: DeletePostDTO) {
    const deleted = await this.postsRepository.delete(id, createdBy);

    if (!deleted) {
      throw new PostNotFoundOrNotAllowedError();
    }
  }
}
