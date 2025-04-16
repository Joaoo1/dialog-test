import { faker } from "@faker-js/faker";
import { generateFakeUser } from "../../../../common/factories/generateFakeUser";
import { PostsRepository } from "../../repositories/PostsRepository";
import { CreatePostUseCase } from "./CreatePostUseCase";

const makeSut = () => {
	const postsRepository = new PostsRepository();
	const sut = new CreatePostUseCase(postsRepository);

	return { sut, postsRepository };
};

describe("Create Post", () => {
	it("should create a new post successfully", async () => {
		const { sut, postsRepository } = makeSut();

		const user = await generateFakeUser();

		const post = await sut.execute({
			text: faker.lorem.sentence(),
			createdBy: user.id,
		});

		expect(post).toBeDefined();

		const createdPost = await postsRepository.findById(post.id);
		expect(createdPost).toBeDefined();
	});
});
