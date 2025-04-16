import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { Bcrypt } from '../../../../common/libs/Hasher';
import { Jwt } from '../../../../common/libs/Jwt';
import { env } from '../../../../env';
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';
import { UsersRepository } from '../../repositories/UsersRepository';
import { AuthenticateUseCase } from './AuthenticateUseCase';

const makeSut = async () => {
  const password = faker.string.alphanumeric(12);
  const user = await generateFakeUser(password);

  const sut = new AuthenticateUseCase(
    new UsersRepository(),
    new Bcrypt(),
    new Jwt(env.JWT_SECRET)
  );

  return { sut, user, password };
};

describe('Authenticate User', () => {
  it('should authenticate an user successfully', async () => {
    const { sut, user, password } = await makeSut();

    const result = await sut.execute({
      email: user.email,
      password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });

  it('should not authenticate a non existing user', async () => {
    const { sut } = await makeSut();

    const promise = sut.execute({
      email: 'non-existing-user@example.com',
      password: '123456',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not authenticate a user with incorrect password', async () => {
    const { sut, user } = await makeSut();

    const promise = sut.execute({
      email: user.email,
      password: '000000',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
