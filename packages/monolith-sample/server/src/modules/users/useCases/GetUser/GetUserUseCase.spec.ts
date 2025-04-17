import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { UsersRepository } from '../../repositories/UsersRepository';
import { GetUserUseCase } from './GetUserUseCase';

const makeSut = async () => {
  const usersRepository = new UsersRepository();
  const sut = new GetUserUseCase(usersRepository);

  return { sut };
};

describe('Get User', () => {
  it('should get a user successfully', async () => {
    const { sut } = await makeSut();

    const createdUser = await generateFakeUser('123456');

    const user = await sut.execute(createdUser.id);

    expect(user).toBeDefined();
    expect(user.id).toBe(createdUser.id);
    expect(user.name).toBe(createdUser.name);
    expect(user.email).toBe(createdUser.email);
  });
});
