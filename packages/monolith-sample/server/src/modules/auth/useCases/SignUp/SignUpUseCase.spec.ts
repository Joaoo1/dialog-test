import { faker } from "@faker-js/faker";
import { generateFakeUser } from "../../../../common/factories/generateFakeUser";
import { Bcrypt } from "../../../../common/libs/Hasher";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import { UsersRepository } from "../../repositories/UsersRepository";
import { SignUpUseCase } from "./SignUpUseCase";

const makeSut = async () => {
	const password = faker.string.alphanumeric(12);
	const user = await generateFakeUser(password);
	const hasher = new Bcrypt();
	const usersRepository = new UsersRepository();
	const sut = new SignUpUseCase(usersRepository, hasher);

	return { sut, user, usersRepository, hasher };
};

describe("Sign up", () => {
	it("should create a new user successfully", async () => {
		const { sut, usersRepository } = await makeSut();

		const email = faker.internet.email();
		const user = await sut.execute({
			name: faker.person.fullName(),
			email,
			password: faker.string.alphanumeric(12),
		});

		expect(user).toBeDefined();

		const createdUser = await usersRepository.findByEmail(email);

		expect(createdUser).toBeDefined();
		expect(createdUser?.email).toBe(email);
	});

	it("should throw UserAlreadyExistsError if the user already exists", async () => {
		const { sut, user } = await makeSut();

		const promise = sut.execute({
			name: user.name,
			email: user.email,
			password: faker.string.alphanumeric(12),
		});

		await expect(promise).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("should hash the password before saving the user", async () => {
		const { sut, user, usersRepository, hasher } = await makeSut();

		const email = faker.internet.email();
		const password = faker.string.alphanumeric(12);
		await sut.execute({
			name: user.name,
			email,
			password,
		});

		const createdUser = await usersRepository.findByEmail(email);

		if (!createdUser) {
			throw new Error("User not found");
		}

		const isValidPassword = await hasher.compare(
			password,
			createdUser.passwordHash,
		);

		expect(isValidPassword).toBe(true);
	});
});
