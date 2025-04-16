import { Box, Flex, Image } from "@chakra-ui/react";
import fullLogo from "../../assets/full-logo.png";
import { SignInForm } from "./components/SignInForm";

export const SignIn: React.FC = () => {
	return (
		<Flex alignItems={"center"} justifyContent="center" height="100vh">
			<Box maxW="400px" width="100%">
				<Image
					src={fullLogo}
					alt="Logo"
					mb={8}
					maxW="200px"
					marginInline="auto"
				/>

				<SignInForm />
			</Box>
		</Flex>
	);
};
