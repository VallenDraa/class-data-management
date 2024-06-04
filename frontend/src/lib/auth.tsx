import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useHandleLogout } from '~/hooks';
import { getAuthToken, getLoginType } from '~/utils/auth-token';
import { UNAUTHED_PAGE_VISIT_MESSAGE } from '~/utils/get-error-message';

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
			toast.error(UNAUTHED_PAGE_VISIT_MESSAGE);
			handleLogout();
			return;
		}

		if (
			pathname.startsWith('/admin') &&
			(!authToken || loginType !== 'admin')
		) {
			toast.error(UNAUTHED_PAGE_VISIT_MESSAGE);
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
