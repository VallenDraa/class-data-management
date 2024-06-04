import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHandleLogout } from '~/hooks';
import { getAuthToken, getLoginType } from '~/utils/auth-token';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const loginType = getLoginType();
	const authToken = getAuthToken();

	const { pathname } = useLocation();
	const { handleLogout } = useHandleLogout(`/admin/login`);

	React.useEffect(() => {
		if (
			pathname === '/mahasiswa/self' &&
			(!authToken || loginType !== 'mahasiswa')
		) {
			handleLogout();
			return;
		}

		if (
			pathname.startsWith('/admin') &&
			(!authToken || loginType !== 'admin')
		) {
			handleLogout();
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return pathname === '/' ? (
		<Navigate to={`/${loginType ?? 'mahasiswa'}`} replace />
	) : (
		children
	);
};
