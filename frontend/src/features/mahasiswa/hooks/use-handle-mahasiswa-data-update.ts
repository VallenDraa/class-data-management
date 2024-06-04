import * as React from 'react';
import { toast } from 'sonner';

import { getErrorMessage } from '~/utils/get-error-message';
import { useUpdateMahasiswa } from '../api';
import { MahasiswaUpdate } from '../types';
import { useAppSearchQueryContext } from '~/providers';

export function useHandleMahasiswaDataUpdate(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQueryContext();

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
				toast.error(getErrorMessage(error));
			}
		},
		[mutateAsync],
	);

	return { handleMahasiswaDataUpdate };
}
