import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { UsersRepository } from '../../repositories/UsersRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const makeSut = async () => {
  const usersRepository = new UsersRepository();
  const sut = new DeleteUserUseCase(usersRepository);

  return { sut, usersRepository };
};

describe('Delete User', () => {
  it('should delete an existing user successfully', async () => {
    const { sut, usersRepository } = await makeSut();

    const user = await generateFakeUser('123456');

    await sut.execute(user.id);

    const deletedUser = await usersRepository.findById(user.id);

    expect(deletedUser).toBeNull();
  });
});
