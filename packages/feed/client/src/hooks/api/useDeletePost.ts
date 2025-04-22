import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError } from '../../interfaces';
import { api } from '../../services/api';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  async function handler(postId: string) {
    const { data } = await api.delete(`/posts/${postId}`);
    return data;
  }

  const mutation = useMutation<void, AxiosError<DefaultApiError>, string>({
    mutationFn: handler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'posts',
      });
    },
  });

  return mutation;
};
