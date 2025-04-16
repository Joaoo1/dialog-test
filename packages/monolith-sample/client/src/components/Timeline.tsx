import type { Post as PostModel } from "../interfaces";
import { Post } from "./Post";

interface Posts {
	posts: PostModel[];
}

export const Timeline: React.FC<Posts> = ({ posts }) => {
	return (
		<div className="timeline">
			<h2>Timeline</h2>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};
