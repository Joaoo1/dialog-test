import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await api.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'posts',
      });
    },
  });
};
