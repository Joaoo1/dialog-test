import type { IHasher } from '../../../../common/libs/Hasher/IHasher';
import type { IJwt } from '../../../../common/libs/Jwt/IJwt';
import type { ISignInDTO } from '../../dtos/ISignInDTO';
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';
import type { IUsersRepository } from '../../repositories/IUsersRepository';

export class SignInUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hasher: IHasher,
    private readonly jwt: IJwt
  ) {}

  async execute({ email, password }: ISignInDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await this.hasher.compare(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    const token = this.jwt.encrypt({ id: user.id });

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
