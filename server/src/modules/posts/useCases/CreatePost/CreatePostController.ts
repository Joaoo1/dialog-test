import type { Response } from 'express';
import { PostsRepository } from '../../repositories/PostsRepository';
import { CreatePostUseCase } from './CreatePostUseCase';
import type { CreatePostRequest } from './CreatePostValidator';

export class CreatePostController {
  async handle(request: CreatePostRequest, response: Response) {
    const createPostUseCase = new CreatePostUseCase(new PostsRepository());

    const post = await createPostUseCase.execute({
      text: request.body.text,
      createdBy: request.user.id,
    });

    response.status(201).json(post);
  }
}
