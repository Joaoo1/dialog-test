import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError, User } from '../../interfaces';
import { api } from '../../services/api';

export interface SignInParams {
	email: string;
	password: string;
}

interface SignInResponse {
	token: string;
	user: User;
}

interface Props {
	onSuccess: (data: SignInResponse) => void;
	onError: (error: AxiosError<DefaultApiError>) => void;
}

export function useSignIn(props: Props) {
	async function handler(params: SignInParams) {
		const { data } = await api.post<SignInResponse>('/auth/sign-in', params);

		return data;
	}

	return useMutation({ mutationFn: handler, ...props });
}
