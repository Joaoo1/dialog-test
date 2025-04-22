import { AppError } from '../../../common/AppError';
import { HttpStatusCode } from '../../../common/HttpStatusCode';

export class PostNotFoundOrNotAllowedError extends AppError {
  constructor() {
    super('Post não encontrado ou não autorizado', HttpStatusCode.NOT_FOUND);
  }
}
