import { useState } from "react";
import type { Post as PostModel } from "../interfaces";
import { api } from "../services/api";

interface Props {
	post: PostModel;
}

export const Post: React.FC<Props> = ({ post }) => {
	const [likes, setLikes] = useState(post.likes);

	const handleLike = () => {
		api
			.post(`/api/posts/${post.id}/like`)
			.then((response) => setLikes(likes + 1))
			.catch((error) => console.error("Error liking post:", error));
	};

	return (
		<div className="post">
			<p>{post.text}</p>
			<button type="button" className="likes" onClick={handleLike}>
				<span role="img" aria-label="like">
					👍
				</span>{" "}
				{likes}
			</button>
		</div>
	);
};
