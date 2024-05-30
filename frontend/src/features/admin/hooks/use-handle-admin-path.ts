import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHandleAdminPath(adminId?: number) {
	const { search } = useLocation();
	const navigate = useNavigate();

	const navigateToAdminMainPath = React.useCallback(
		() => navigate(`/admin${search}`),
		[navigate, search],
	);

	const toAdminMainPath = React.useCallback(
		() => ({ pathname: `/admin`, search }),
		[search],
	);

	const navigateToAdminDetailPath = React.useCallback(() => {
		if (adminId === undefined) {
			throw new Error('adminId is required to navigate to admin detail path');
		}

		navigate(`/admin/${adminId}${search}`);
	}, [adminId, navigate, search]);

	const toAdminDetailPath = React.useCallback(() => {
		if (adminId === undefined) {
			console.trace('🚀 ~ toAdminDetailPath ~ adminId:', adminId);
			throw new Error('adminId is required to navigate to admin detail path');
		}

		return { pathname: `/admin/${adminId}`, search };
	}, [adminId, search]);

	return {
		navigateToAdminDetailPath,
		navigateToAdminMainPath,
		toAdminDetailPath,
		toAdminMainPath,
	};
}
