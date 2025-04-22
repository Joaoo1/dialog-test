import { AppError } from '../../../common/AppError';
import { HttpStatusCode } from '../../../common/HttpStatusCode';

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('O usuário já existe', HttpStatusCode.CONFLICT);
  }
}
