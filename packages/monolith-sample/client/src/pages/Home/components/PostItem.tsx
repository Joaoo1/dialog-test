import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { useDeletePost } from '../../../hooks/api/useDeletePost';
import { useAuth } from '../../../hooks/context/useAuth';
import type { ListPost } from '../../../interfaces';
import {
  formatDate,
  formatToHumanFriendlyDate,
} from '../../../utils/formatDate';

interface NewsItemProps {
  post: ListPost;
}

export const PostItem: React.FC<NewsItemProps> = ({ post }) => {
  const { isAuthenticated, user } = useAuth();

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const { mutate: deleteNews, isPending: isDeleting } = useDeletePost();

  const handleDelete = () => {
    deleteNews(post.id, {
      onSuccess: () => {
        toast.success('Postagem excluída com sucesso.');
        setShowConfirmDeleteModal(false);
      },
      onError: () => {
        toast.error('Erro ao excluir postagem.');
      },
    });
  };

  const renderPostContentConsideringBreakLines = () => {
    return post.text.split('\n').map(line => (
      <Text key={line} mb="2">
        {line || <>&nbsp;</>}
      </Text>
    ));
  };

  const shouldShowDeleteButton = isAuthenticated && post.authorId === user?.id;

  return (
    <Flex
      p="5"
      borderWidth="1px"
      borderColor="gray.600"
      borderRadius="md"
      minW="200px"
      justifyContent="space-between"
      gap="2"
      overflow="hidden"
      bg="gray.700"
    >
      {showConfirmDeleteModal && (
        <ConfirmModal
          title="Excluir postagem"
          description="Você tem certeza que deseja excluir esta postagem?"
          onConfirm={handleDelete}
          onClose={() => setShowConfirmDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}

      <Flex flexDir="column" width="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Icon as={IoPersonCircle} color="gray.400" mr="2" boxSize="48px" />

            <Box>
              <Text fontWeight="bold">{post.authorName}</Text>
              <Text
                fontSize="sm"
                color="gray.400"
                title={formatDate(post.createdAt)}
              >
                {formatToHumanFriendlyDate(post.createdAt)}
              </Text>
            </Box>
          </Flex>

          {shouldShowDeleteButton && (
            <IconButton
              title="Excluir postagem"
              aria-label="Excluir"
              icon={<MdOutlineDelete size={20} />}
              colorScheme="red"
              variant="ghost"
              isLoading={isDeleting}
              onClick={() => setShowConfirmDeleteModal(true)}
            />
          )}
        </Flex>

        <Box mt="6">{renderPostContentConsideringBreakLines()}</Box>
      </Flex>
    </Flex>
  );
};
