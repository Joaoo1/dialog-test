import type { Response } from "express";
import { Bcrypt } from "../../../../common/libs/Hasher";
import { UsersRepository } from "../../repositories/UsersRepository";
import { SignUpUseCase } from "./SignUpUseCase";
import type { SignUpRequest } from "./SignUpValidator";

export class SignUpController {
	async handle(request: SignUpRequest, response: Response) {
		const signUpUseCase = new SignUpUseCase(
			new UsersRepository(),
			new Bcrypt(),
		);

		const result = await signUpUseCase.execute(request.body);

		response.status(200).json(result);
	}
}
