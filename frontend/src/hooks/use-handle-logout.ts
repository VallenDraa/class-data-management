import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logout } from '~/features/authentication/api';
import { removeAuthToken } from '~/utils/auth-token';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';

export function useHandleLogout(redirectPath?: string) {
	const navigate = useNavigate();
	const handleLogout = React.useCallback(async () => {
		try {
			await logout();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(getErrorMessage(error));
				return;
			}

			toast.error(DEFAULT_ERROR_MESSAGE);
		} finally {
			removeAuthToken();
			navigate(redirectPath ?? '/mahasiswa/login');
		}
	}, [navigate, redirectPath]);

	return { handleLogout };
}
