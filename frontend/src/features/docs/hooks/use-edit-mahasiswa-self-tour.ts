import React from 'react';
import { useTourContext } from '~/providers';
import { BUTTON_LOCALE } from '../constants';
import { Step } from 'react-joyride';

const tourSteps: Step[] = [
	{
		locale: BUTTON_LOCALE,
		target: '#user-profile',
		spotlightClicks: true,
		disableBeacon: true,
		disableOverlayClose: true,
		hideFooter: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Untuk mengedit profile, anda dapat menekan foto profile milik anda.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#profile-dropdown-button',
		spotlightClicks: true,
		disableBeacon: true,
		disableOverlayClose: true,
		hideFooter: true,
		hideCloseButton: true,
		hideBackButton: true,
		content: 'Kemudian tekan profile.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#change-password',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Untuk mengubah password, anda dapat menekan tombol "Ubah Password".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#change-avatar',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Sedangkan untuk mengubah foto, anda dapat menekan foto profile anda sekarang.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#edit-profile',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Terakhir untuk mengedit data profil, anda dapat menekan tombol "Edit Profil".',
	},
	{
		locale: BUTTON_LOCALE,
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		target: '#edit-profile',
		content: 'Itu saja, Selamat mencoba!',
	},
];

export function useEditMahasiswaSelfTour() {
	const { tourState, setTourState } = useTourContext();

	const profileDialogAlwaysOn =
		tourState.tourActive &&
		tourState.stepIndex >= 2 &&
		tourState.tourType === 'edit-self-mahasiswa';

	const showEditProfileTour = React.useCallback(() => {
		setTourState(prev => ({
			...prev,
			tourType: 'edit-self-mahasiswa',
			run: true,
			tourActive: true,
			stepIndex: 0,
			steps: tourSteps,
		}));
	}, [setTourState]);

	const openProfileDropdownStep = React.useCallback(() => {
		if (!tourState.tourActive) {
			return;
		}

		if (tourState.stepIndex > 0) {
			return;
		}

		setTourState(prev => ({ ...prev, run: false, stepIndex: 1 }));

		setTimeout(() => {
			setTourState(prev => ({ ...prev, run: true }));
		}, 500);
	}, [setTourState, tourState.tourActive, tourState.stepIndex]);

	const openProfileStep = React.useCallback(() => {
		if (!tourState.tourActive) {
			return;
		}

		setTourState(prev => ({ ...prev, run: false, stepIndex: 2 }));

		setTimeout(() => {
			setTourState(prev => ({ ...prev, run: true }));
		}, 200);
	}, [setTourState, tourState.tourActive]);

	return {
		profileDialogAlwaysOn,
		showEditProfileTour,
		openProfileStep,
		openProfileDropdownStep,
	};
}
