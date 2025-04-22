import { UserNotFoundError } from '../../errors/UserNotFoundError';
import type { IUsersRepository } from '../../repositories/IUsersRepository';

export class GetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { passwordHash: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
