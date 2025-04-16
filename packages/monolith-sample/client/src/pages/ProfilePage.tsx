import type React from "react";
import { Link } from "react-router";
import { Profile } from "../components/Profile";

export const ProfilePage: React.FC = () => {
	return (
		<div className="profile-page">
			<Link to="/" className="back-link">
				Back to Timeline
			</Link>
			<Profile />
		</div>
	);
};
