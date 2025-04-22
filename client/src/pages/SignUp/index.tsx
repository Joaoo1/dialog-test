import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import fullLogo from '../../assets/full-logo.png';
import { SignUpForm } from './components/SignUpForm';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <IconButton
        aria-label="Voltar"
        title="Voltar"
        as={FiArrowLeft}
        boxSize={8}
        position="absolute"
        left={{ base: 4, md: 8 }}
        top={{ base: 6, md: 8 }}
        variant="ghost"
        colorScheme="white"
        cursor="pointer"
        onClick={goBack}
      />
      <Box maxW="400px" width="100%" px="4">
        <Image
          src={fullLogo}
          alt="Logo"
          mb={8}
          maxW="200px"
          marginInline="auto"
        />

        <SignUpForm />
      </Box>
    </Flex>
  );
};
