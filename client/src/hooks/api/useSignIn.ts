import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError, User } from '../../interfaces';
import { api } from '../../services/api';

export interface SignInProps {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

export function useSignIn() {
  async function handler(props: SignInProps) {
    const { data } = await api.post<SignInResponse>('/auth/sign-in', props);

    return data;
  }

  const mutation = useMutation<
    SignInResponse,
    AxiosError<DefaultApiError>,
    SignInProps
  >({ mutationFn: handler });

  return mutation;
}
