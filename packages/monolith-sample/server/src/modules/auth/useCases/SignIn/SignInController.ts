import type { Response } from "express";
import { Bcrypt } from "../../../../common/libs/Hasher";
import { Jwt } from "../../../../common/libs/Jwt";
import { env } from "../../../../env";
import { UsersRepository } from "../../repositories/UsersRepository";
import { SignInUseCase } from "./SignInUseCase";
import type { SignInRequest } from "./SignInValidator";

export class SignInController {
	async handle(request: SignInRequest, response: Response) {
		const { email, password } = request.body;

		const signInUseCase = new SignInUseCase(
			new UsersRepository(),
			new Bcrypt(),
			new Jwt(env.JWT_SECRET),
		);

		const result = await signInUseCase.execute({ email, password });

		response.status(200).json(result);
	}
}
