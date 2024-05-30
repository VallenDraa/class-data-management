import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './lib/auth';
import { getLoginType } from './utils/auth-token';
import { useHandleLogout } from './hooks';
import { AppSearchQueryContextProvider } from './providers';

export function Root() {
	const loginType = getLoginType();

	const { pathname } = useLocation();
	const { handleLogout } = useHandleLogout('/mahasiswa/login');

	React.useEffect(() => {
		if (loginType !== 'mahasiswa' && loginType !== 'admin') {
			handleLogout();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ProtectedRoute>
			{pathname === '/' && <Navigate to={`/${loginType}`} replace />}
			<AppSearchQueryContextProvider>
				<Outlet />
			</AppSearchQueryContextProvider>
		</ProtectedRoute>
	);
}
