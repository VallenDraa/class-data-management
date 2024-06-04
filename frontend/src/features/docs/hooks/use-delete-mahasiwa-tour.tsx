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
			'Untuk menghapus mahasiswa, anda dapat menekan salah satu profil mahasiswa disini.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#delete-mahasiswa-button',
		spotlightClicks: true,
		disableBeacon: true,
		disableOverlayClose: true,
		hideFooter: true,
		hideCloseButton: true,
		hideBackButton: true,
		disableScrolling: true,
		disableScrollParentFix: true,
		content: 'Kemudian tekan tombol "Hapus Mahasiswa".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#confirm-delete-mahasiswa-button',
		disableScrolling: true,
		disableBeacon: true,
		disableScrollParentFix: true,
		content:
			'Setelah itu anda dapat menekan tombol "Hapus", untuk mengkonfirmasi penghapusan mahasiswa.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#cancel-delete-mahasiswa-button',
		disableScrolling: true,
		disableBeacon: true,
		disableScrollParentFix: true,
		content:
			'Jika anda tidak jadi ingin menghapus, anda bisa menekan tombol "Cancel".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#cancel-delete-mahasiswa-button',
		disableScrolling: true,
		disableScrollParentFix: true,
		disableBeacon: true,
		content: 'Itu saja, Selamat mencoba!',
	},
];

export function useDeleteMahasiswaTour() {
	const { tourState, setTourState } = useTourContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const showDeleteMahasiswaTour = React.useCallback(
		(initialPathname: string, onFinishRedirect: string) => {
			if (pathname !== initialPathname) {
				navigate(initialPathname);
			}

			setTourState(prev => ({
				...prev,
				tourType: 'delete-mahasiswa',
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

	const openMahasiswaDetailProfileDeleteStep = React.useCallback(() => {
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

	const openDeleteConfirmationDialogDeleteStep = React.useCallback(() => {
		if (!tourState.tourActive) {
			return;
		}

		if (tourState.stepIndex > 1) {
			return;
		}

		setTourState(prev => ({ ...prev, run: false }));

		setTimeout(
			() => setTourState(prev => ({ ...prev, run: true, stepIndex: 2 })),
			100,
		);
	}, [setTourState, tourState.tourActive, tourState.stepIndex]);

	const isOnMahasiswaDeleteTour =
		tourState.tourActive && tourState.tourType === 'delete-mahasiswa';

	const enableOutsideClickForDeleteDialog = !isOnMahasiswaDeleteTour;

	const forceOpenCreateMahasiswaDialogStep =
		tourState.tourActive &&
		tourState.tourType === 'delete-mahasiswa' &&
		tourState.stepIndex >= 2;

	return {
		showDeleteMahasiswaTour,
		openMahasiswaDetailProfileDeleteStep,
		openDeleteConfirmationDialogDeleteStep,
		isOnMahasiswaDeleteTour,
		enableOutsideClickForDeleteDialog,
		forceOpenCreateMahasiswaDialogStep,
	};
}
