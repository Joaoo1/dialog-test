import type { Request, Response } from "express";
import { PostsRepository } from "../../repositories/PostsRepository";
import { ListPostsUseCase } from "./ListPostsUseCase";

export class ListPostsController {
	async handle(request: Request, response: Response) {
		const listPostsUseCase = new ListPostsUseCase(new PostsRepository());

		const posts = await listPostsUseCase.execute(request.user.id);

		response.status(200).json(posts);
	}
}
