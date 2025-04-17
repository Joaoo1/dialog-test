import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError, User } from '../../interfaces';
import { api } from '../../services/api';

export interface SignUpParams {
  email: string;
  password: string;
  name: string;
}

interface SignUpResponse {
  user: User;
}

interface Props {
  onSuccess: (data: SignUpResponse) => void;
  onError: (error: AxiosError<DefaultApiError>) => void;
}

export function useSignUp(props: Props) {
  async function handler(params: SignUpParams) {
    const { data } = await api.post<SignUpResponse>('/auth/sign-up', params);

    return data;
  }

  return useMutation({ mutationFn: handler, ...props });
}
