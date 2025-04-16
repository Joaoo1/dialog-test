import { AppError } from '../../../common/AppError';
import { HttpStatusCode } from '../../../common/HttpStatusCode';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Credenciais inválidas', HttpStatusCode.UNAUTHORIZED);
  }
}
