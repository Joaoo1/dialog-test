import { Navigate } from 'react-router';

import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/context/useAuth';

interface IRouteWrapperProps {
	children: React.ReactNode;
	isSignInPage?: boolean;
}

export const RouteWrapper: React.FC<IRouteWrapperProps> = ({
	isSignInPage = false,
	children,
}) => {
	const { isAuthenticated, isLoadingAuthInfo } = useAuth();

	if (isLoadingAuthInfo) {
		return <Loading />;
	}

	if (isSignInPage && isAuthenticated) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};
