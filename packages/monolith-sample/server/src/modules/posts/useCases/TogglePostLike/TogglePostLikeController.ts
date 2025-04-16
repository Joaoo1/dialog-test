import type { Response } from 'express';
import { PostsLikesRepository } from '../../repositories/PostsLikesRepository';
import { TogglePostLikeUseCase } from './TogglePostLikeUseCase';
import type { TogglePostLikeRequest } from './TogglePostLikeValidator';

export class TogglePostLikeController {
  async handle(request: TogglePostLikeRequest, response: Response) {
    const togglePostLikeUseCase = new TogglePostLikeUseCase(
      new PostsLikesRepository()
    );

    const result = await togglePostLikeUseCase.execute({
      postId: request.params.postId,
      userId: request.user.id,
    });

    response.status(200).json(result);
  }
}
