import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHandleAdminPath() {
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
		navigate(`/admin/self${search}`);
	}, [navigate, search]);

	const toAdminDetailPath = React.useCallback(() => {
		return { pathname: `/admin/self`, search };
	}, [search]);

	return {
		navigateToAdminDetailPath,
		navigateToAdminMainPath,
		toAdminDetailPath,
		toAdminMainPath,
	};
}
