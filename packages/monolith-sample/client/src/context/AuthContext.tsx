import localforage from 'localforage';
import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-toastify';

import { type SignInParams, useSignIn } from '../hooks/api/useSignIn';
import type { User } from '../interfaces';

interface AuthContextProps {
	signIn: (data: SignInParams) => void;
	signOut: () => void;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	isLoadingAuthInfo: boolean;
	user: User | null;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoadingAuthInfo, setLoadingAuthInfo] = useState(true);

	const init = useCallback(async () => {
		const user = await localforage.getItem<User>('user');
		setUser(user);

		setLoadingAuthInfo(false);
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	const { mutate: login, isPending: isAuthenticating } = useSignIn({
		onSuccess: async data => {
			await localforage.setItem('user', data.user);
			await localforage.setItem('token', data.token);

			await init();
		},
		onError: err => {
			toast.error(err?.response?.data?.message ?? 'Erro');
		},
	});

	const signOut = async () => {
		await localforage.removeItem('user');
		await localforage.removeItem('token');

		setUser(null);
		window.location.href = '/';
	};

	return (
		<AuthContext.Provider
			value={{
				signIn: login,
				isAuthenticated: !!user,
				isLoadingAuthInfo,
				user,
				signOut,
				isAuthenticating,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
