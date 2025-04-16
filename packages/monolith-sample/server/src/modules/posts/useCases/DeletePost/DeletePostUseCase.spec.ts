import { faker } from "@faker-js/faker/.";
import { generateFakeUser } from "../../../../common/factories/generateFakeUser";
import { PostNotFoundOrNotAllowedError } from "../../errors/PostNotFoundOrNotAllowedError";
import { PostsRepository } from "../../repositories/PostsRepository";
import { DeletePostUseCase } from "./DeletePostUseCase";

const makeSut = async () => {
	const postsRepository = new PostsRepository();
	const sut = new DeletePostUseCase(postsRepository);
	const user = await generateFakeUser();

	return { sut, postsRepository, user };
};

describe("Delete Post", () => {
	it("should delete a post successfully", async () => {
		const { sut, postsRepository, user } = await makeSut();

		const post = await postsRepository.create({
			text: "Test post",
			createdBy: user.id,
		});

		await sut.execute({ id: post.id, createdBy: user.id });

		const deletedPost = await postsRepository.findById(post.id);

		expect(deletedPost).toBeNull();
	});

	it("should throw PostNotFoundOrNotAllowedError if post does not exist", async () => {
		const { sut, user } = await makeSut();

		const promise = sut.execute({
			id: faker.string.uuid(),
			createdBy: user.id,
		});

		await expect(promise).rejects.toBeInstanceOf(PostNotFoundOrNotAllowedError);
	});

	it("should throw PostNotFoundOrNotAllowedError when trying to delete another user's post", async () => {
		const { sut, user, postsRepository } = await makeSut();

		const post = await postsRepository.create({
			text: "Test post",
			createdBy: user.id,
		});

		const user1 = await generateFakeUser();

		const promise = sut.execute({
			id: post.id,
			createdBy: user1.id,
		});

		await expect(promise).rejects.toBeInstanceOf(PostNotFoundOrNotAllowedError);
	});
});
