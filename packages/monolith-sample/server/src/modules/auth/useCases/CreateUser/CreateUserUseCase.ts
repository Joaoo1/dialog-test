import type { IHasher } from "../../../../common/libs/Hasher/IHasher";
import type { ICreateUserUserDTO } from "../../dtos/ICreateUserUserDTO";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserUseCase {
	constructor(
		private readonly usersRepository: IUsersRepository,
		private readonly hasher: IHasher,
	) {}

	async execute({ email, password, name }: ICreateUserUserDTO) {
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
