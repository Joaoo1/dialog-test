import type { Request, Response } from "express";
import { UsersRepository } from "../../repositories/UsersRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
	async handle(request: Request, response: Response): Promise<void> {
		const deleteUserUseCase = new DeleteUserUseCase(new UsersRepository());

		await deleteUserUseCase.execute(request.user.id);

		response.status(204).send();
	}
}
