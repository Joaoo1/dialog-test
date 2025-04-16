import type { Response } from 'express';
import { PostsRepository } from '../../repositories/PostsRepository';
import { DeletePostUseCase } from './DeletePostUseCase';
import type { DeletePostRequest } from './DeletePostValidator';

export class DeletePostController {
  async handle(request: DeletePostRequest, response: Response) {
    const deletePostUseCase = new DeletePostUseCase(new PostsRepository());

    await deletePostUseCase.execute({
      id: request.params.id,
      createdBy: request.user.id,
    });

    response.status(204).send();
  }
}
