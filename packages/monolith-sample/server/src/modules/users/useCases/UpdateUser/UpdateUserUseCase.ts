import type { IHasher } from '../../../../common/libs/Hasher/IHasher';
import type { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IncorrectCurrentPasswordError } from '../../errors/IncorrectCurrentPasswordError';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import type { IUsersRepository } from '../../repositories/IUsersRepository';

export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hasher: IHasher
  ) {}

  async execute({
    id,
    email,
    name,
    currentPassword,
    password,
  }: IUpdateUserDTO) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (email && user.email !== email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email);

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError();
      }
    }

    if (currentPassword) {
      const isPasswordValid = await this.hasher.compare(
        currentPassword,
        user.passwordHash
      );

      if (!isPasswordValid) {
        throw new IncorrectCurrentPasswordError();
      }
    }

    const passwordHash = password
      ? await this.hasher.hash(password)
      : undefined;

    const updatedUser = await this.usersRepository.update(id, {
      email,
      name,
      passwordHash,
    });

    return { user: updatedUser };
  }
}
