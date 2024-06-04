import * as React from 'react';
import { useTourContext } from '~/providers';
import { BUTTON_LOCALE } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';

const tourSteps = [
	{
		locale: BUTTON_LOCALE,
		target: '#search-bar',
		disableBeacon: true,
		content:
			'Disini anda dapat mencari mahasiswa menggunakan NIM atau Nama Mahasiswa.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#search-sort-type',
		disableBeacon: true,
		content:
			'Kemudian anda bisa mengurutkan hasil pencarian disini berdasarkan data terbaru, terlama, huruf A-Z, atau huruf Z-A.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#search-results',
		disableBeacon: true,
		content:
			'Hasil pencarian akan ditampilkan disini. Anda bisa melihat detail mahasiswa dengan mengklik salah satu hasil pencarian.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#search-results',
		disableBeacon: true,
		content: 'Itu saja, Selamat mencoba!',
	},
];

export function useSearchMahasiswaTour() {
	const { setTourState } = useTourContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const showSearchMahasiswa = React.useCallback(
		(initialPathname: string) => {
			if (pathname !== initialPathname) {
				navigate(initialPathname);
			}

			setTimeout(() => {
				setTourState(prev => ({
					...prev,
					run: true,
					tourType: 'search-mahasiswa',
					tourActive: true,
					stepIndex: 0,
					steps: tourSteps,
				}));
			}, 100);
		},
		[setTourState, navigate, pathname],
	);

	return { showSearchMahasiswa };
}
