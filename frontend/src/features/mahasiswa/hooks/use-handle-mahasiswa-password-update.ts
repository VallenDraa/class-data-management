import * as React from 'react';
import { toast } from 'sonner';
import { useUpdateMahasiswaPassword } from '~/features/mahasiswa/api';
import { ChangePassword } from '~/features/mahasiswa/components';
import { getErrorMessage } from '~/utils/get-error-message';

export function useHandleMahasiswaPasswordUpdate() {
	const { mutateAsync } = useUpdateMahasiswaPassword();

	const handleMahasiswaPasswordUpdate = React.useCallback(
		async (data: ChangePassword) => {
			try {
				await mutateAsync({ ...data });
				toast.success('Berhasil mengubah password');
			} catch (error) {
				toast.error(getErrorMessage(error));
			}
		},
		[mutateAsync],
	);

	return { handleMahasiswaPasswordUpdate };
}
