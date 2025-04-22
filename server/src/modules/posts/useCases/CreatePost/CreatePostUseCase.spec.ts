import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { io } from '../../../../server/app';
import { WebSocketEvents } from '../../../../server/websocket/events';
import { PostsRepository } from '../../repositories/PostsRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

const makeSut = () => {
  const postsRepository = new PostsRepository();
  const sut = new CreatePostUseCase(postsRepository);

  return { sut, postsRepository };
};

describe('Create Post', () => {
  it('should create a new post successfully', async () => {
    const { sut, postsRepository } = makeSut();

    const user = await generateFakeUser();

    const post = await sut.execute({
      text: faker.lorem.sentence(),
      createdBy: user.id,
    });

    expect(post).toBeDefined();

    const createdPost = await postsRepository.findById(post.id);
    expect(createdPost).toBeDefined();
  });

  it('should emit NEW_POST event after creating a post', async () => {
    const { sut } = makeSut();
    const user = await generateFakeUser();

    const emitSpy = jest.spyOn(io, 'emit').mockImplementation(() => true);

    const post = await sut.execute({
      text: faker.lorem.sentence(),
      createdBy: user.id,
    });

    expect(emitSpy).toHaveBeenCalledWith(WebSocketEvents.NEW_POST, {
      authorId: user.id,
      postId: post.id,
    });
    emitSpy.mockRestore();
  });
});
