import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ConfirmModal } from '../../../../../components/ConfirmModal';
import { useDeletePost } from '../../../../../hooks/api/useDeletePost';
import type { ListPost } from '../../../../../interfaces';

interface Props {
  post: ListPost;
}

export const DeletePostButton: React.FC<Props> = ({ post }) => {
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

  return (
    <>
      {showConfirmDeleteModal && (
        <ConfirmModal
          title="Excluir postagem"
          description="Você tem certeza que deseja excluir esta postagem?"
          onConfirm={handleDelete}
          onClose={() => setShowConfirmDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}

      <IconButton
        title="Excluir postagem"
        aria-label="Excluir"
        icon={<MdOutlineDelete size={20} />}
        colorScheme="red"
        variant="ghost"
        isLoading={isDeleting}
        onClick={() => setShowConfirmDeleteModal(true)}
      />
    </>
  );
};
