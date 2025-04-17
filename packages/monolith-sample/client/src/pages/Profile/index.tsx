import { Avatar, Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Header } from '../../components/Header';
import { useDeleteUser } from '../../hooks/api/useDeleteUser';
import { useAuth } from '../../hooks/context/useAuth';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { UpdateProfileModal } from './components/UpdateProfileModal';

export const Profile: React.FC = () => {
  const headerHeight = useHeaderHeight();
  const { user, signOut } = useAuth();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser({
    onSuccess: () => {
      toast.success('Perfil excluído com sucesso.');
      signOut();
    },
    onError: () => {
      toast.error('Erro ao excluir perfil.');
    },
  });

  return (
    <Box>
      {showConfirmDeleteModal && (
        <ConfirmModal
          title="Excluir perfil"
          description="Você tem certeza que deseja excluir o seu perfil? Esta ação não pode ser desfeita."
          onConfirm={deleteUser}
          onClose={() => setShowConfirmDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}

      {showUpdateProfileModal && (
        <UpdateProfileModal onClose={() => setShowUpdateProfileModal(false)} />
      )}

      <Header />

      <Box maxW="md" mx="auto" p={8}>
        <VStack
          p="8"
          spacing={4}
          bg="gray.800"
          borderWidth={1}
          borderColor="gray.700"
          borderRadius="lg"
          mt={{ base: `${headerHeight + 70}px`, sm: `${headerHeight + 20}px` }}
        >
          <Avatar size="xl" name={user?.name} />
          <Heading as="h2" size="lg">
            {user?.name || 'Usuário'}
          </Heading>
          <Text color="gray.200">{user?.email || 'Email não disponível'}</Text>
          <Box w="100%" pt={2}>
            <Box display="flex" gap={3} justifyContent="center">
              <Button
                colorScheme="brand"
                variant="solid"
                onClick={() => setShowUpdateProfileModal(true)}
              >
                Alterar Perfil
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                isLoading={isDeleting}
                onClick={() => setShowConfirmDeleteModal(true)}
              >
                Excluir
              </Button>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
