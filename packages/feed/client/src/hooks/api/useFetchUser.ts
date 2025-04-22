import { useQuery } from '@tanstack/react-query';

import type { User } from '../../interfaces';
import { api } from '../../services/api';

interface Props {
  enabled: boolean;
}

export const useFetchUser = (props: Props) => {
  async function handler() {
    const { data } = await api.get<User>('/users', {});

    return data;
  }

  const query = useQuery({
    queryFn: handler,
    queryKey: ['user-profile'],
    enabled: props.enabled,
  });

  return query;
};
