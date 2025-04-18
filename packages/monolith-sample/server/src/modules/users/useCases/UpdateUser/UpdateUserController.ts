import type { Response } from 'express';
import { Bcrypt } from '../../../../common/libs/Hasher';
import { UsersRepository } from '../../repositories/UsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import type { UpdateUserRequest } from './UpdateUserValidator';

export class UpdateUserController {
  async handle(request: UpdateUserRequest, response: Response) {
    const updateUserUseCase = new UpdateUserUseCase(
      new UsersRepository(),
      new Bcrypt()
    );

    const updatedUser = await updateUserUseCase.execute({
      id: request.user.id,
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
      currentPassword: request.body.currentPassword,
    });

    response.status(200).json(updatedUser);
  }
}
