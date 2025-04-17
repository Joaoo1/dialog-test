import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError } from '../../interfaces';
import { api } from '../../services/api';

interface Props {
  onSuccess: () => void;
  onError: (error: AxiosError<DefaultApiError>) => void;
}

export const useDeleteUser = (props: Props) => {
  async function handler() {
    await api.delete('/users');
  }

  return useMutation({ mutationFn: handler, ...props });
};
