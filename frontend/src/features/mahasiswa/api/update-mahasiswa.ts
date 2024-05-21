import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { GetMahasiswaSearchParams, type MahasiswaUpdate } from '../types';
import { alamatValidator, idValidator } from '~/utils/validators';
import { api } from '~/lib/api-client';
import { AxiosResponse } from 'axios';
import { QUERY_KEY } from '../constants';

export type UpdateMahasiswaParams = {
	id: number;
	data: MahasiswaUpdate;
};

export type UseUpdateMahasiswaOptions = {
	searchParams: GetMahasiswaSearchParams;
	onSuccess?: (
		data: AxiosResponse,
		variables: UpdateMahasiswaParams,
		context: unknown,
	) => void;
	onError?: (
		error: Error,
		variables: UpdateMahasiswaParams,
		context: unknown,
	) => unknown;
};

export const updateMahasiswaValidator: z.ZodType<MahasiswaUpdate> = z.object({
	nama: z.string().optional(),
	nim: z.string().optional(),
	tanggal_lahir: z.string().optional(),
	no_telepon: z.string().optional(),
	list_kesukaan: z.array(z.string()).optional(),
	alamat: alamatValidator.optional(),
});

export const updateMahasiswa = async ({ id, data }: UpdateMahasiswaParams) => {
	const validatedId = await idValidator.parseAsync(id);
	const validatedData = await updateMahasiswaValidator.parseAsync(data);

	return api.put(`/mahasiswa/${validatedId}`, validatedData);
};

export const useUpdateMahasiswa = ({
	searchParams,
	onSuccess,
	onError,
}: UseUpdateMahasiswaOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY, searchParams] });

			onSuccess?.(data, variables, context);
		},
		onError,
		mutationFn: updateMahasiswa,
	});
};
