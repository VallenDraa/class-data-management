import * as React from 'react';
import { toast } from 'sonner';
import { useAdminUpdateMahasiswa } from '../api';
import { MahasiswaUpdate } from '~/features/mahasiswa/types';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';
import { useAppSearchQuery } from '~/providers';

export function useHandleAdminMahasiswaUpdate(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQuery();

	const { mutateAsync } = useAdminUpdateMahasiswa(mahasiswaId, {
		sort: activeSort,
		keyword: activeKeyword,
	});
	const handleAdminMahasiswaUpdate = React.useCallback(
		async (data: MahasiswaUpdate) => {
			try {
				await mutateAsync({ id: mahasiswaId, data });
				toast.success('Berhasil mengubah data mahasiswa');
			} catch (error) {
				if (error instanceof Error) {
					toast.error(getErrorMessage(error));
					return;
				}

				toast.error(DEFAULT_ERROR_MESSAGE);
			}
		},
		[mahasiswaId, mutateAsync],
	);

	return { handleAdminMahasiswaUpdate };
}
