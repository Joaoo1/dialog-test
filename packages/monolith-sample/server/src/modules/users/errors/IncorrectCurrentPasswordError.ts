import { AppError } from '../../../common/AppError';

export class IncorrectCurrentPasswordError extends AppError {
  constructor() {
    super('Senha atual incorreta', 400);
  }
}
