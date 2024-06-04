import * as React from 'react';
import { toast } from 'sonner';
import { useAdminUpdateMahasiswa } from '../api';
import { MahasiswaUpdate } from '~/features/mahasiswa/types';
import { getErrorMessage } from '~/utils/get-error-message';
import { useAppSearchQueryContext } from '~/providers';

export function useHandleAdminMahasiswaUpdate(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQueryContext();

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
				toast.error(getErrorMessage(error));
			}
		},
		[mahasiswaId, mutateAsync],
	);

	return { handleAdminMahasiswaUpdate };
}
