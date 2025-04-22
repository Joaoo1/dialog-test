import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError, User } from '../../interfaces';
import { api } from '../../services/api';

export interface SignUpProps {
  email: string;
  password: string;
  name: string;
}

interface SignUpResponse {
  user: User;
}

export function useSignUp() {
  async function handler(props: SignUpProps) {
    const { data } = await api.post<SignUpResponse>('/auth/sign-up', props);

    return data;
  }

  const mutation = useMutation<
    SignUpResponse,
    AxiosError<DefaultApiError>,
    SignUpProps
  >({ mutationFn: handler });

  return mutation;
}
