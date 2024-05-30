import * as React from 'react';
import { useDeleteMahasiswa } from '../api';
import { toast } from 'sonner';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';
import { useAdminMahasiswaDetailDialogStatus } from '../providers';
import { useAppSearchQuery } from '~/providers';

export function useHandleMahasiwaDelete(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQuery();

	const [isDeleting, setIsDeleting] = React.useState(false);
	const { setIsOpen } = useAdminMahasiswaDetailDialogStatus();

	const { mutateAsync } = useDeleteMahasiswa({
		keyword: activeKeyword,
		sort: activeSort,
	});
	const handleMahasiswaDelete = React.useCallback(async () => {
		try {
			setIsDeleting(true);
			await mutateAsync({ id: Number(mahasiswaId) });
			setIsOpen(false);
			toast.error('Berhasil menghapus mahasiswa');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(getErrorMessage(error));
			}

			toast.error(DEFAULT_ERROR_MESSAGE);
		} finally {
			setIsDeleting(false);
		}
	}, [mutateAsync, mahasiswaId, setIsOpen]);

	return { handleMahasiswaDelete, isDeleting };
}
