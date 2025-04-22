import type { Request, Response } from 'express';
import { UsersRepository } from '../../repositories/UsersRepository';
import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const getUserUseCase = new GetUserUseCase(new UsersRepository());

    const result = await getUserUseCase.execute(request.user.id);

    response.json(result);
  }
}
