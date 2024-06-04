import * as React from 'react';
import { toast } from 'sonner';
import { useAddMahasiswa } from '~/features/admin/api';
import { MahasiswaInsert } from '~/features/mahasiswa/types';
import { useAppSearchQueryContext } from '~/providers';
import { getErrorMessage } from '~/utils/get-error-message';

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
				toast.error(getErrorMessage(error));
			}
		},
		[mutateAsync],
	);

	return { handleAddMahasiswa };
}
