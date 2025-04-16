import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ProfilePage } from "./pages/ProfilePage";
import { TimelinePage } from "./pages/TimelinePage";
import theme from "./styles/theme";

const queryClient = new QueryClient();

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<Router>
					<div className="App">
						<Routes>
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/" element={<TimelinePage />} />
						</Routes>
					</div>
				</Router>
			</ChakraProvider>
		</QueryClientProvider>
	);
};
