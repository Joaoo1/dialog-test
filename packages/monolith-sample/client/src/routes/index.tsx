import { BrowserRouter, Route, Routes } from "react-router";
import { ProfilePage } from "../pages/ProfilePage";
import { SignIn } from "../pages/SignIn";
import { TimelinePage } from "../pages/TimelinePage";
import { RouteWrapper } from "./RouteWrapper";

export const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route
				path="/profile"
				element={
					<RouteWrapper>
						<ProfilePage />
					</RouteWrapper>
				}
			/>
			<Route
				path="/"
				element={
					<RouteWrapper>
						<TimelinePage />
					</RouteWrapper>
				}
			/>
			<Route
				path="/sign-in"
				element={
					<RouteWrapper isSignInPage>
						<SignIn />
					</RouteWrapper>
				}
			/>
		</Routes>
	</BrowserRouter>
);
