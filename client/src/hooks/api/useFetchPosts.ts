import { useQuery } from '@tanstack/react-query';

import type { ListPost } from '../../interfaces';
import { api } from '../../services/api';

interface FetchPostsProps {
  search?: string;
}

export const useFetchPosts = (props: FetchPostsProps) => {
  async function handler() {
    const { search } = props || {};
    const { data } = await api.get<ListPost[]>('/posts', {
      params: { search },
    });

    return data;
  }

  const query = useQuery({
    queryFn: handler,
    queryKey: ['posts', props.search],
  });

  return query;
};
