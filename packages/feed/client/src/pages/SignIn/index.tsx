import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import fullLogo from '../../assets/full-logo.png';
import { SignInForm } from './components/SignInForm';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <IconButton
        aria-label="Voltar para home"
        title="Voltar para home"
        as={FiArrowLeft}
        boxSize={8}
        position="absolute"
        left={{ base: 4, md: 8 }}
        top={{ base: 6, md: 8 }}
        variant="ghost"
        colorScheme="white"
        cursor="pointer"
        onClick={() => navigate('/')}
      />
      <Box maxW="400px" width="100%" px="4">
        <Image
          src={fullLogo}
          alt="Logo"
          mb={8}
          maxW="200px"
          marginInline="auto"
        />

        <SignInForm />

        <Box borderTop="1px" borderColor="gray.600" pt={8} mt={10} />

        <Text textAlign="center">
          Não possui uma conta?{' '}
          <Box color="brand.600" fontWeight="bold" as={Link} to="/sign-up">
            Cadastre-se
          </Box>
        </Text>
      </Box>
    </Flex>
  );
};
