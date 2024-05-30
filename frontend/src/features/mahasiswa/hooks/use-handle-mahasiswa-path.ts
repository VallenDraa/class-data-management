import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHandleMahasiswaPath(mahasiswaId: number) {
	const { search } = useLocation();
	const navigate = useNavigate();

	const navigateToMahasiswaMainPath = React.useCallback(
		() => navigate(`/mahasiswa${search}`),
		[navigate, search],
	);

	const navigateToMahasiswaDetailPath = React.useCallback(
		() => navigate(`/mahasiswa/${mahasiswaId}${search}`),
		[mahasiswaId, navigate, search],
	);

	const toMahasiswaMainPath = React.useCallback(
		() => ({ pathname: `/mahasiswa`, search }),
		[search],
	);

	const toMahasiswaDetailPath = React.useCallback(
		() => ({ pathname: `/mahasiswa/${mahasiswaId}`, search }),
		[mahasiswaId, search],
	);

	return {
		navigateToMahasiswaMainPath,
		navigateToMahasiswaDetailPath,
		toMahasiswaDetailPath,
		toMahasiswaMainPath,
	};
}
