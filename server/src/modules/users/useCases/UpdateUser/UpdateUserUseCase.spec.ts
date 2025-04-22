import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { Bcrypt } from '../../../../common/libs/Hasher';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { UsersRepository } from '../../repositories/UsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const makeSut = async () => {
  const usersRepository = new UsersRepository();
  const sut = new UpdateUserUseCase(usersRepository, new Bcrypt());
  const user = await generateFakeUser('123456');

  return { sut, usersRepository, user };
};

describe('Update User', () => {
  it('should update an existing user successfully', async () => {
    const { sut, usersRepository, user } = await makeSut();

    const newEmail = faker.internet.email();
    const newName = faker.person.fullName();

    await sut.execute({
      id: user.id,
      email: newEmail,
      name: newName,
    });

    const updatedUser = await usersRepository.findById(user.id);

    if (!updatedUser) {
      throw new Error('User not found');
    }

    expect(updatedUser.email).toBe(newEmail);
    expect(updatedUser.name).toBe(newName);
  });

  it('should throw UserNotFoundError if the user does not exist', async () => {
    const { sut } = await makeSut();

    const promise = sut.execute({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should throw UserAlreadyExistsError if the user already exists', async () => {
    const { sut, user, usersRepository } = await makeSut();

    const email = faker.internet.email();

    await usersRepository.create({
      email,
      name: faker.person.fullName(),
      passwordHash: '123456',
    });

    const promise = sut.execute({
      id: user.id,
      name: user.name,
      email,
    });

    await expect(promise).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
