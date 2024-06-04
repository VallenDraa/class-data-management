import React from 'react';
import { useTourContext } from '~/providers';
import { BUTTON_LOCALE } from '../constants';
import { Step } from 'react-joyride';
import { useLocation, useNavigate } from 'react-router-dom';

const tourSteps: Step[] = [
	{
		locale: BUTTON_LOCALE,
		target: '#create-mahasiswa-button',
		spotlightClicks: true,
		disableBeacon: true,
		disableOverlayClose: true,
		hideFooter: true,
		hideBackButton: true,
		content:
			'Untuk menambahkan data mahasiswa baru, anda dapat menekan tombol "+" di pojok kanan bawah layar.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#create-mahasiswa-form-fields',
		disableOverlayClose: true,
		disableBeacon: true,
		content:
			'Kemudian anda dapat mengisi form ini dengan data-data mahasiswa yang ingin ditambahkan.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#save-mahasiswa-button',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Lalu untuk menyimpan data mahasiswa, anda dapat menekan tombol "Simpan".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#save-mahasiswa-button',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		content: 'Itu saja, Selamat mencoba!',
	},
];

export function useCreateMahasiswaTour() {
	const { tourState, setTourState } = useTourContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const showCreateMahasiswaTour = React.useCallback(
		(initialPathname: string) => {
			if (pathname !== initialPathname) {
				navigate(initialPathname);
			}

			setTimeout(() => {
				setTourState(prev => ({
					...prev,
					tourType: 'create-mahasiswa',
					run: true,
					tourActive: true,
					stepIndex: 0,
					steps: tourSteps,
				}));
			}, 100);
		},
		[setTourState, navigate, pathname],
	);

	const openCreateMahasiswaDialogStep = React.useCallback(() => {
		if (!tourState.tourActive) {
			return;
		}

		if (tourState.stepIndex > 0) {
			return;
		}

		setTourState(prev => ({ ...prev, run: false }));

		setTimeout(() => {
			setTourState(prev => ({ ...prev, run: true, stepIndex: 1 }));
		}, 100);
	}, [setTourState, tourState.tourActive, tourState.stepIndex]);

	const enableOutsideClickForCreateDialog = !(
		tourState.tourActive && tourState.tourType === 'create-mahasiswa'
	);

	const forceOpenCreateMahasiswaDialogStep =
		tourState.tourActive &&
		tourState.tourType === 'create-mahasiswa' &&
		tourState.stepIndex >= 1;

	return {
		showCreateMahasiswaTour,
		openCreateMahasiswaDialogStep,
		enableOutsideClickForCreateDialog,
		forceOpenCreateMahasiswaDialogStep,
	};
}
