import type { Response } from 'express';
import { Bcrypt } from '../../../../common/libs/Hasher';
import { Jwt } from '../../../../common/libs/Jwt';
import { env } from '../../../../env';
import { UsersRepository } from '../../repositories/UsersRepository';
import { AuthenticateUseCase } from './AuthenticateUseCase';
import type { AuthenticateRequest } from './AuthenticateValidator';

export class AuthenticateController {
  async handle(request: AuthenticateRequest, response: Response) {
    const { email, password } = request.body;

    const authenticateUseCase = new AuthenticateUseCase(
      new UsersRepository(),
      new Bcrypt(),
      new Jwt(env.JWT_SECRET)
    );

    const token = await authenticateUseCase.execute({ email, password });

    response.status(200).json(token);
  }
}
