import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHandleAdminMahasiswaPath(mahasiswaId: number) {
	const { search } = useLocation();
	const navigate = useNavigate();

	const navigateToAdminMahasiswaDetailPath = React.useCallback(
		() => navigate(`/admin/mahasiswa/${mahasiswaId}${search}`),
		[mahasiswaId, navigate, search],
	);

	const toAdminMahasiswaDetailPath = React.useMemo(
		() => ({
			pathname: `/admin/mahasiswa/${mahasiswaId}`,
			search,
		}),
		[mahasiswaId, search],
	);

	return {
		navigateToAdminMahasiswaDetailPath,
		toAdminMahasiswaDetailPath,
	};
}
