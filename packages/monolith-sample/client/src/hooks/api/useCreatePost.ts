import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post } from '../../interfaces';
import { api } from '../../services/api';

interface CreateNewsParams {
  text: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateNewsParams) => {
      const response = await api.post<Post>('/posts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'posts',
      });
    },
  });
};
