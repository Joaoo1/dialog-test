import type { CreatePostDTO } from "../../dtos/CreatePostDTO";
import type { IPostsRepository } from "../../repositories/IPostsRepository";

export class CreatePostUseCase {
	constructor(private readonly postsRepository: IPostsRepository) {}

	async execute({ text, createdBy }: CreatePostDTO) {
		const post = await this.postsRepository.create({
			text,
			createdBy,
		});

		return post;
	}
}
