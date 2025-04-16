import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../../hooks/context/useAuth';
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
      >
        Entrar
      </Button>
    );
  }

  return (
    <Flex gap="2" justifyContent="flex-end">
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}

      <Flex>
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
      </Flex>

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
