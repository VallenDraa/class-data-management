import { Navigate } from 'react-router-dom';
import { getAuthToken } from '~/utils/auth-token';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const token = getAuthToken();

	if (!token) {
		return <Navigate to="/mahasiswa/login" replace />;
	}

	return children;
};
