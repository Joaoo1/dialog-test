import { Heading } from "@chakra-ui/react";
import type { Post as PostModel } from "../interfaces";
import { Post } from "./Post";

interface Posts {
	posts: PostModel[];
}

export const Timeline: React.FC<Posts> = ({ posts }) => {
	return (
		<div className="timeline">
			<Heading>Timeline</Heading>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};
