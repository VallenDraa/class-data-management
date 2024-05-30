import { api } from '~/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetMahasiswaSearchParams } from '~/features/mahasiswa/types';
import { idValidator } from '~/utils/validators';
import { MAHASISWA_QUERY_KEY } from '~/features/mahasiswa/constants';

export type DeleteMahasiswaParams = {
	id: number;
};

export type UseDeleteMahasiswaOptions = {
	searchParams: GetMahasiswaSearchParams;
};

export const deleteMahasiswa = async ({ id }: DeleteMahasiswaParams) => {
	const validatedMahasiswaId = await idValidator.parseAsync(id);

	return api.delete(`/mahasiswa`, {
		data: { id: validatedMahasiswaId },
	});
};

export const useDeleteMahasiswa = (searchParams: GetMahasiswaSearchParams) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteMahasiswa,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, searchParams],
			});
		},
	});
};
