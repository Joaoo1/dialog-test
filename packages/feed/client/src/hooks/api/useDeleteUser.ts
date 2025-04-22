import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError } from '../../interfaces';
import { api } from '../../services/api';

export const useDeleteUser = () => {
  async function handler() {
    await api.delete('/users');
  }

  const mutation = useMutation<void, AxiosError<DefaultApiError>, void>({
    mutationFn: handler,
  });

  return mutation;
};
