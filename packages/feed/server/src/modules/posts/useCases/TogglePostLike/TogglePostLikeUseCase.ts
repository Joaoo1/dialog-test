import { io } from '../../../../server/app';
import { WebSocketEvents } from '../../../../server/websocket/events';
import type { TogglePostLikeDTO } from '../../dtos/TogglePostLikeDTO';
import type { IPostsLikesRepository } from '../../repositories/IPostsLikesRepository';

export class TogglePostLikeUseCase {
  constructor(private readonly postsLikesRepository: IPostsLikesRepository) {}

  async execute({ postId, userId }: TogglePostLikeDTO) {
    const alreadyLiked = await this.postsLikesRepository.findByPostAndUser(
      postId,
      userId
    );

    io.emit(WebSocketEvents.LIKE_POST, {
      postId,
      userId,
      isLiked: !alreadyLiked,
    });

    if (alreadyLiked) {
      await this.postsLikesRepository.delete(postId, userId);

      return { isLiked: false, postId, userId };
    }

    await this.postsLikesRepository.create({
      postId,
      userId,
    });

    return { isLiked: true, postId };
  }
}
