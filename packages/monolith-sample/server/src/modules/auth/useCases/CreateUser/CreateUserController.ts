import type { Response } from "express";
import { Bcrypt } from "../../../../common/libs/Hasher";
import { Jwt } from "../../../../common/libs/Jwt";
import { env } from "../../../../env";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import type { CreateUserRequest } from "./CreateUserValidator";

export class CreateUserController {
	async handle(request: CreateUserRequest, response: Response) {
		const createUserUseCase = new CreateUserUseCase(
			new UsersRepository(),
			new Bcrypt(),
		);

		const token = await createUserUseCase.execute(request.body);

		response.status(200).json(token);
	}
}
