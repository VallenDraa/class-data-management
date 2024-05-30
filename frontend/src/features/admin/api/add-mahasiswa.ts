import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import {
	GetMahasiswaSearchParams,
	type MahasiswaInsert,
} from '~/features/mahasiswa/types';
import { api } from '~/lib/api-client';
import { MAHASISWA_QUERY_KEY } from '~/features/mahasiswa/constants';

export type AddMahasiswaParams = {
	data: MahasiswaInsert;
};

export const addMahasiswaValidator: z.ZodType<MahasiswaInsert> = z.object({
	nama: z.string().trim().min(1, 'Nama tidak boleh kosong!'),
	nim: z.string().trim().min(1, 'Nim tidak boleh kosong!'),
	tanggal_lahir: z.string().trim().min(1, 'Tanggal Lahir tidak boleh kosong!'),
	alamat: z.string().trim().min(1, 'Alamat tidak boleh kosong!'),
});

export const addMahasiswa = async ({ data }: AddMahasiswaParams) => {
	const validatedData = await addMahasiswaValidator.parseAsync(data);

	return api.post(`/mahasiswa`, {
		...validatedData,
		tanggal_lahir: format(validatedData.tanggal_lahir, 'yyyy-MM-dd'),
	});
};

export const useAddMahasiswa = (searchParams: GetMahasiswaSearchParams) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addMahasiswa,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, searchParams],
			});
		},
	});
};
