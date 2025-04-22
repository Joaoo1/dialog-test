import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/context/useAuth';
import { CreatePostModal } from './CreatePostModal';

export const RightContainer: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut, isAuthenticated } = useAuth();

  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <Button
        aria-label="Entrar"
        colorScheme="brand"
        onClick={() => navigate('/sign-in')}
        justifySelf="flex-end"
        paddingInline="8"
        mr="2"
      >
        Entrar
      </Button>
    );
  }

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Flex gap="2" justifyContent="flex-end" mr="2">
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}

      <Button
        variant="ghost"
        color="white"
        colorScheme="whiteAlpha"
        onClick={handleProfileClick}
      >
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="center"
          pr="2"
          pt="1"
        >
          <Text
            fontWeight="bold"
            lineHeight="1"
            overflow="hidden"
            whiteSpace="nowrap"
            fontSize={{ base: 'sm', lg: 'md' }}
          >
            {user?.name}
          </Text>
          <Text
            fontSize="sm"
            color="gray.200"
            display={{ base: 'none', md: 'block' }}
          >
            {user?.email}
          </Text>
        </Flex>
      </Button>

      <Button
        aria-label="Sair"
        colorScheme="brand"
        title="Sair"
        onClick={() => setShowCreateModal(true)}
      >
        Postar
      </Button>

      <Button
        aria-label="Sair"
        colorScheme="brand"
        title="Sair"
        variant="outline"
        onClick={signOut}
      >
        Sair
      </Button>
    </Flex>
  );
};
