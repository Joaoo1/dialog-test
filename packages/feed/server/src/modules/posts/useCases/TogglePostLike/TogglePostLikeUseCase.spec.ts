import { faker } from '@faker-js/faker';
import { generateFakeUser } from '../../../../common/factories/generateFakeUser';
import { PostsLikesRepository } from '../../repositories/PostsLikesRepository';
import { PostsRepository } from '../../repositories/PostsRepository';
import { TogglePostLikeUseCase } from './TogglePostLikeUseCase';

const makeSut = async () => {
  const postsRepository = new PostsRepository();
  const postsLikesRepository = new PostsLikesRepository();
  const sut = new TogglePostLikeUseCase(postsLikesRepository);

  const user = await generateFakeUser();
  const post = await postsRepository.create({
    text: faker.lorem.sentence(),
    createdBy: user.id,
  });

  return { sut, postsLikesRepository, user, post };
};

describe('Toggle Post Like', () => {
  it('should like a post if not already liked', async () => {
    const { sut, postsLikesRepository, user, post } = await makeSut();

    await sut.execute({ postId: post.id, userId: user.id });

    const like = await postsLikesRepository.findByPostAndUser(post.id, user.id);
    expect(like).toBeDefined();
  });

  it('should unlike a post if already liked', async () => {
    const { sut, postsLikesRepository, user, post } = await makeSut();

    await postsLikesRepository.create({
      postId: post.id,
      userId: user.id,
    });

    await sut.execute({ postId: post.id, userId: user.id });

    const like = await postsLikesRepository.findByPostAndUser(post.id, user.id);
    expect(like).toBeNull();
  });
});
