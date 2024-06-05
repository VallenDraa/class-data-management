import * as React from 'react';
import { useDeleteMahasiswa } from '../api';
import { toast } from 'sonner';
import { getErrorMessage } from '~/utils/get-error-message';
import { useAdminMahasiswaDetailDialogStatus } from '../providers';
import { useAppSearchQueryContext } from '~/providers';

export function useHandleMahasiwaDelete(mahasiswaId: number) {
	const { activeKeyword, activeSort } = useAppSearchQueryContext();

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
			toast.success('Berhasil menghapus mahasiswa');
		} catch (error) {
			toast.error(getErrorMessage(error));
		} finally {
			setIsDeleting(false);
		}
	}, [mutateAsync, mahasiswaId, setIsOpen]);

	return { handleMahasiswaDelete, isDeleting };
}
