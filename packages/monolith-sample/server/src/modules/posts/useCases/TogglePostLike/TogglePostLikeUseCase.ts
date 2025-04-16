import type { TogglePostLikeDTO } from "../../dtos/TogglePostLikeDTO";
import type { IPostsLikesRepository } from "../../repositories/IPostsLikesRepository";

export class TogglePostLikeUseCase {
	constructor(private readonly postsLikesRepository: IPostsLikesRepository) {}

	async execute({ postId, userId }: TogglePostLikeDTO) {
		const alreadyLiked = await this.postsLikesRepository.findByPostAndUser(
			postId,
			userId,
		);

		if (alreadyLiked) {
			await this.postsLikesRepository.delete(postId, userId);
			return;
		}

		await this.postsLikesRepository.create({
			postId,
			userId,
		});
	}
}
