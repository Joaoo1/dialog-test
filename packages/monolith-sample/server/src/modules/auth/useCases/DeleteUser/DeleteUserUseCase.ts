import type { IUsersRepository } from "../../repositories/IUsersRepository";

export class DeleteUserUseCase {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute(userId: string): Promise<void> {
		await this.usersRepository.delete(userId);
	}
}
