import * as React from 'react';
import { toast } from 'sonner';

import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';
import { useUpdateMahasiswa } from '../api';
import { MahasiswaUpdate } from '../types';
import { useAppSearchQuery } from '~/providers';

export function useHandleMahasiswaDataUpdate(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQuery();

	const { mutateAsync } = useUpdateMahasiswa(mahasiswaId, {
		keyword: activeKeyword,
		sort: activeSort,
	});
	const handleMahasiswaDataUpdate = React.useCallback(
		async (data: MahasiswaUpdate) => {
			try {
				await mutateAsync({ data });
				toast.success('Berhasil mengubah data mahasiswa');
			} catch (error) {
				if (error instanceof Error) {
					toast.error(getErrorMessage(error));
					return;
				}

				toast.error(DEFAULT_ERROR_MESSAGE);
			}
		},
		[mutateAsync],
	);

	return { handleMahasiswaDataUpdate };
}
