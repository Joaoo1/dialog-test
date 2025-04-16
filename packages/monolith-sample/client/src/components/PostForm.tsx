import { useState } from "react";
import type { Post } from "../interfaces";
import { api } from "../services/api";

interface Props {
	onPostCreated?: (post: Post) => void;
}

export const PostForm: React.FC<Props> = ({ onPostCreated }) => {
	const [text, setText] = useState("");

	const handleSubmit: React.FormEventHandler = async (e) => {
		e.preventDefault();

		if (!text) return;

		try {
			const response = await api.post("/api/posts", { text });
			setText("");
			if (onPostCreated) {
				onPostCreated(response.data);
			}
		} catch (error) {
			console.error("Error creating post:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="What's on your mind?"
				rows={3}
			/>
			<button type="submit">Post</button>
		</form>
	);
};
