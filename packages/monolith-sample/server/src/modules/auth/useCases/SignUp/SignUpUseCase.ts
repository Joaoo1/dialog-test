import type { IHasher } from "../../../../common/libs/Hasher/IHasher";
import type { ISignUpDTO } from "../../dtos/ISignUpDTO";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";

export class SignUpUseCase {
	constructor(
		private readonly usersRepository: IUsersRepository,
		private readonly hasher: IHasher,
	) {}

	async execute({ email, password, name }: ISignUpDTO) {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await this.hasher.hash(password);

		const createdUser = await this.usersRepository.create({
			name,
			email,
			passwordHash,
		});

		return { user: createdUser };
	}
}
