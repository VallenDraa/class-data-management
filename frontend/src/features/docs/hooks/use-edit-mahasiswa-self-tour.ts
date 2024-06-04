import React from 'react';
import { useTourContext } from '~/providers';
import { BUTTON_LOCALE } from '../constants';
import { Step } from 'react-joyride';
import { useLocation, useNavigate } from 'react-router-dom';

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
		target: '#change-avatar',
		disableBeacon: true,
		disableOverlayClose: true,
		hideCloseButton: true,
		hideBackButton: true,
		content:
			'Untuk mengubah foto, anda dapat menekan foto profile anda sekarang.',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#edit-profile',
		disableBeacon: true,
		content:
			'Lalu untuk mengedit data profil, anda dapat menekan tombol "Edit Profil".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#change-password',
		disableBeacon: true,
		content:
			'Terakhir, password bisa diubah dengan menekan tombol "Ganti Password".',
	},
	{
		locale: BUTTON_LOCALE,
		target: '#edit-profile',
		disableBeacon: true,
		content: 'Itu saja, Selamat mencoba!',
	},
];

export function useEditMahasiswaSelfTour() {
	const { tourState, setTourState } = useTourContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const showEditProfileTour = React.useCallback(
		(initialPathname: string) => {
			if (pathname !== initialPathname) {
				navigate(initialPathname);
			}

			setTimeout(() => {
				setTourState(prev => ({
					...prev,
					tourType: 'edit-self-mahasiswa',
					run: true,
					tourActive: true,
					stepIndex: 0,
					steps: tourSteps,
				}));
			}, 100);
		},
		[setTourState, navigate, pathname],
	);

	const openProfileDropdownStep = React.useCallback(() => {
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

	const openProfileStep = React.useCallback(() => {
		if (!tourState.tourActive) {
			return;
		}

		setTourState(prev => ({ ...prev, run: false }));

		setTimeout(() => {
			setTourState(prev => ({ ...prev, run: true, stepIndex: 2 }));
		}, 100);
	}, [setTourState, tourState.tourActive]);

	return { showEditProfileTour, openProfileStep, openProfileDropdownStep };
}
