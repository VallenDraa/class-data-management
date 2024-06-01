import * as React from 'react';
import { toast } from 'sonner';
import { useAddMahasiswa } from '~/features/admin/api';
import { MahasiswaInsert } from '~/features/mahasiswa/types';
import { useAppSearchQueryContext } from '~/providers';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';

export function useHandleMahasiswaAdd() {
	const { activeKeyword, activeSort } = useAppSearchQueryContext();

	const { mutateAsync } = useAddMahasiswa({
		keyword: activeKeyword,
		sort: activeSort,
	});
	const handleAddMahasiswa = React.useCallback(
		async (data: MahasiswaInsert) => {
			try {
				await mutateAsync({ data });
				toast.success('Mahasiswa berhasil ditambahkan');
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

	return { handleAddMahasiswa };
}
