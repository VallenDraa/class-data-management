import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { GetMahasiswaSearchParams, type MahasiswaUpdate } from '../types';
import { alamatValidator } from '~/utils/validators';
import { api } from '~/lib/api-client';
import { MAHASISWA_QUERY_KEY } from '../constants';
import { format } from 'date-fns';

export type UpdateMahasiswaParams = {
	data: MahasiswaUpdate;
};

export type UseUpdateMahasiswaOptions = {
	mahasiswaId: number;
};

export const updateMahasiswaValidator = z.object({
	nama: z.string().trim().min(1, 'Nama tidak boleh kosong!').optional(),
	nim: z.string().trim().min(1, 'NIM tidak boleh kosong!').optional(),
	tanggal_lahir: z
		.string()
		.trim()
		.min(1, 'Tanggal lahir tidak boleh kosong!')
		.optional(),
	no_telepon: z
		.string()
		.trim()
		.min(1, 'No.Telepon tidak boleh kosong!')
		.optional(),
	list_kesukaan: z
		.array(z.string().trim().min(1, 'Salah satu kesukaan tidak boleh kosong!'))
		.optional(),
	alamat: alamatValidator.optional(),
});

export const updateMahasiswa = async ({ data }: UpdateMahasiswaParams) => {
	let validatedData = await updateMahasiswaValidator.parseAsync(data);

	if (validatedData.tanggal_lahir) {
		validatedData.tanggal_lahir = format(
			validatedData.tanggal_lahir,
			'yyyy-MM-dd',
		);
	}

	if ('alamat' in validatedData) {
		validatedData = {
			...validatedData,
			alamat: validatedData.alamat?.alamat,
			latitude: validatedData.alamat?.latitude,
			longitude: validatedData.alamat?.longitude,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any;
	}

	return api.put(`/mahasiswa`, validatedData);
};

export const useUpdateMahasiswa = (
	mahasiswaId: number,
	queryParameter: GetMahasiswaSearchParams,
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateMahasiswa,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, mahasiswaId],
			});
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, 'self'],
			});
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, queryParameter],
				refetchType: 'active',
			});
		},
	});
};
