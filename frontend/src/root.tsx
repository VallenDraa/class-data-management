import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './lib/auth';
import * as React from 'react';
import { logout } from './features/authentication/api';
import { getErrorMessage } from './utils/get-error-message';

export function Root() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const loginType = localStorage.getItem('login_type');

	React.useEffect(() => {
		const handleFailRedirect = async () => {
			if (loginType !== 'mahasiswa' && loginType !== 'admin') {
				try {
					await logout();
					navigate('/mahasiswa/login', { replace: true });
				} catch (error) {
					throw new Error(getErrorMessage(error));
				} finally {
					localStorage.removeItem('token');
					localStorage.removeItem('login_type');
				}
			}
		};

		void handleFailRedirect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ProtectedRoute>
			{pathname === '/' && <Navigate to={`/${loginType}`} replace />}
			<Outlet />
		</ProtectedRoute>
	);
}
