import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PostForm } from "../components/PostForm";
import { Timeline } from "../components/Timeline";
import type { Post } from "../interfaces";
import { api } from "../services/api";

export const TimelinePage: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		api
			.get("/api/posts")
			.then((response) => setPosts(response.data))
			.catch((error) => console.error("Error fetching posts:", error));
	}, []);

	const handlePostCreated = (newPost: Post) => {
		setPosts([newPost, ...posts]);
	};

	return (
		<div className="timeline-page">
			<Link to="/profile" className="profile-link">
				Go to Profile
			</Link>
			<PostForm onPostCreated={handlePostCreated} />
			<Timeline posts={posts} />
		</div>
	);
};
