import { generateFakeUser } from "../../../../common/factories/generateFakeUser";
import { PostsLikesRepository } from "../../repositories/PostsLikesRepository";
import { PostsRepository } from "../../repositories/PostsRepository";
import { ListPostsUseCase } from "./ListPostsUseCase";

const makeSut = async () => {
	const postsRepository = new PostsRepository();
	const sut = new ListPostsUseCase(postsRepository);
	const user = await generateFakeUser();

	return { sut, postsRepository, user };
};

describe("List Posts", () => {
	it("should list posts successfully", async () => {
		const { sut, postsRepository, user } = await makeSut();

		const post = await postsRepository.create({
			text: "Test post",
			createdBy: user.id,
		});
		const post1 = await postsRepository.create({
			text: "Test post",
			createdBy: user.id,
		});

		const posts = await sut.execute(user.id);
		const testPostIds = posts.map((post) => post.id);

		expect(testPostIds).toContain(post.id);
		expect(testPostIds).toContain(post1.id);
	});

	it("should show which posts are liked by user", async () => {
		const { sut, postsRepository, user } = await makeSut();

		const post = await postsRepository.create({
			text: "Test post",
			createdBy: user.id,
		});
		const postsLikesRepository = new PostsLikesRepository();
		await postsLikesRepository.create({
			postId: post.id,
			userId: user.id,
		});

		const posts = await sut.execute(user.id);

		const likedPostIndex = posts.findIndex((p) => p.id === post.id);

		const [likedPost] = posts.splice(likedPostIndex, 1);

		expect(likedPost.likedByUser).toBe(true);

		const everyOtherPostIsNotLikedByUser = posts.every(
			(p) => p.likedByUser === false,
		);
		expect(everyOtherPostIsNotLikedByUser).toBe(true);
	});
});
