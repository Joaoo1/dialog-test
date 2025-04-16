import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { ProfilePage } from "./pages/ProfilePage";
import { TimelinePage } from "./pages/TimelinePage";
import theme from "./styles/theme";
import { toastStyles } from "./styles/toast";

const queryClient = new QueryClient();

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer
				theme="dark"
				autoClose={3000}
				position="bottom-center"
				toastStyle={toastStyles}
			/>

			<ChakraProvider theme={theme}>
				<Router>
					<Routes>
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/" element={<TimelinePage />} />
					</Routes>
				</Router>
			</ChakraProvider>
		</QueryClientProvider>
	);
};
