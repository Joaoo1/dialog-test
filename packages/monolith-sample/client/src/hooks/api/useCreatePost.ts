import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError, Post } from '../../interfaces';
import { api } from '../../services/api';

interface CreateNewsProps {
  text: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  async function handler(props: CreateNewsProps) {
    const { data } = await api.post<Post>('/posts', props);
    return data;
  }

  const mutation = useMutation<
    Post,
    AxiosError<DefaultApiError>,
    CreateNewsProps
  >({
    mutationFn: handler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'posts',
      });
    },
  });

  return mutation;
};
