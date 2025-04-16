import type { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";

export class UpdateUserUseCase {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute({ id, email, name }: IUpdateUserDTO) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new UserNotFoundError();
		}

		if (email && user.email !== email) {
			const userWithSameEmail = await this.usersRepository.findByEmail(email);

			if (userWithSameEmail) {
				throw new UserAlreadyExistsError();
			}
		}

		const updatedUser = await this.usersRepository.update(id, {
			email,
			name,
		});

		return { user: updatedUser };
	}
}
