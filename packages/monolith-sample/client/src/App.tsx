import type React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ProfilePage } from "./pages/ProfilePage";
import { TimelinePage } from "./pages/TimelinePage";

export const App: React.FC = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/" element={<TimelinePage />} />
				</Routes>
			</div>
		</Router>
	);
};
