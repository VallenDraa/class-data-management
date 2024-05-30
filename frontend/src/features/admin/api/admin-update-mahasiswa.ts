import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { alamatValidator, idValidator } from '~/utils/validators';
import { api } from '~/lib/api-client';
import { format } from 'date-fns';
import { MAHASISWA_QUERY_KEY } from '~/features/mahasiswa/constants';
import {
	GetMahasiswaSearchParams,
	type MahasiswaUpdate,
} from '~/features/mahasiswa/types';

export type AdminUpdateMahasiswaParams = {
	id: number;
	data: MahasiswaUpdate;
};

export type UseAdminUpdateMahasiswaOptions = {
	mahasiswaId: number;
};

export const adminUpdateMahasiswaValidator = z.object({
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

export const adminUpdateMahasiswa = async ({
	id,
	data,
}: AdminUpdateMahasiswaParams) => {
	const validatedId = await idValidator.parseAsync(id);
	let validatedData = await adminUpdateMahasiswaValidator.parseAsync(data);

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

	return api.put(`/mahasiswa/${validatedId}`, validatedData);
};

export const useAdminUpdateMahasiswa = (
	id: number,
	searchParams: GetMahasiswaSearchParams,
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: adminUpdateMahasiswa,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, id],
			});
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, 'self'],
			});
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, searchParams],
			});
		},
	});
};
