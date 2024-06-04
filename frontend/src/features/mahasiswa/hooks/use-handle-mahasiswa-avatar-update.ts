import * as React from 'react';
import { toast } from 'sonner';

import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';
import { useUpdateMahasiswaAvatar } from '../api';
import { useAppSearchQueryContext } from '~/providers';

export function useHandleMahasiswaAvatarUpdate(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQueryContext();
	const { mutateAsync: updateAvatar } = useUpdateMahasiswaAvatar(mahasiswaId, {
		keyword: activeKeyword,
		sort: activeSort,
	});

	const handleMahasiswaAvatarUpdate = React.useCallback(
		async (imageBase64: string | null) => {
			try {
				if (!imageBase64) {
					toast.error('Tidak ada gambar baru yang dipilih');
					return;
				}

				await updateAvatar({ image: imageBase64 });
			} catch (error) {
				if (error instanceof Error) {
					toast.error(getErrorMessage(error));
					throw error;
				}

				toast.error(DEFAULT_ERROR_MESSAGE);
				throw error;
			}
		},
		[updateAvatar],
	);

	return { handleMahasiswaAvatarUpdate };
}
