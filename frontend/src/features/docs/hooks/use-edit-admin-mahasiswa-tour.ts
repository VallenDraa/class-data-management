import React from 'react';
import { useTourContext } from '~/providers';
import { BUTTON_LOCALE } from '../constants';
import { Step } from 'react-joyride';
import { useLocation, useNavigate } from 'react-router-dom';

const tourSteps: Step[] = [
	{
		locale: BUTTON_LOCALE,
		target: '#mahasiswa-profile',
		spotlightClicks: true,
		disableBeacon: true,
		disableOverlayClose: true,
		hideFooter: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Untuk mengedit profile seorang mahasiswa, anda dapat menekan salah satu profile yang tersedia.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#change-avatar',
		hideBackButton: true,
		placement: 'top-start',
		disableScrolling: true,
		disableScrollParentFix: true,
		content:
			'Untuk mengubah foto, anda dapat menekan foto profile anda sekarang.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#edit-profile',
		placement: 'top-start',
		disableScrolling: true,
		disableScrollParentFix: true,
		content:
			'Terakhir untuk mengedit data profil, anda dapat menekan tombol "Edit Profil".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#edit-profile',
		placement: 'top-start',
		disableScrolling: true,
		disableScrollParentFix: true,
		content: 'Itu saja, Selamat mencoba!',
	},
];

export function useEditAdminMahasiswaTour() {
	const { tourState, setTourState } = useTourContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const showEditProfileTour = React.useCallback(
		(initialPathname: string, onFinishRedirect: string) => {
			if (pathname !== initialPathname) {
				navigate(initialPathname);
			}

			setTourState(prev => ({
				...prev,
				tourType: 'edit-admin-mahasiswa',
				run: false,
				tourActive: true,
				stepIndex: 0,
				steps: tourSteps,
				onClose: () => navigate(onFinishRedirect),
			}));

			setTimeout(() => {
				setTourState(prev => ({ ...prev, run: true }));
			}, 100);
		},
		[setTourState, navigate, pathname],
	);

	const openMahasiswaDetailProfileEditStep = React.useCallback(() => {
		if (!tourState.tourActive) {
			return;
		}

		if (tourState.stepIndex > 0) {
			return;
		}

		setTourState(prev => ({ ...prev, run: false }));

		setTimeout(
			() => setTourState(prev => ({ ...prev, run: true, stepIndex: 1 })),
			100,
		);
	}, [setTourState, tourState.tourActive, tourState.stepIndex]);

	const isOnEditAdminMahasiswaTour =
		tourState.tourActive && tourState.tourType === 'edit-admin-mahasiswa';

	return {
		showEditProfileTour,
		openMahasiswaDetailProfileEditStep,
		isOnEditAdminMahasiswaTour,
	};
}
