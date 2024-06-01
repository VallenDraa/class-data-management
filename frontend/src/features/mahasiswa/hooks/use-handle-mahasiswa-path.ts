import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHandleMahasiswaPath(mahasiswaId: number) {
	const { search } = useLocation();
	const navigate = useNavigate();

	const navigateToMahasiswaMainPath = React.useCallback(
		() => navigate(`/mahasiswa${search}`),
		[navigate, search],
	);

	const navigateToMahasiswaSelfPath = React.useCallback(
		() => navigate(`/mahasiswa/self`),
		[navigate],
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

	const toMahasiswaSelfPath = React.useCallback(
		() => ({ pathname: `/mahasiswa/self`, search }),
		[search],
	);

	return {
		navigateToMahasiswaSelfPath,
		navigateToMahasiswaMainPath,
		navigateToMahasiswaDetailPath,
		toMahasiswaDetailPath,
		toMahasiswaMainPath,
		toMahasiswaSelfPath,
	};
}
