import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { type MahasiswaInsert } from '~/features/mahasiswa/types';
import { alamatValidator } from '~/utils/validators';
import { api } from '~/lib/api-client';
import { AxiosResponse } from 'axios';

export type AddMahasiswaParams = {
	data: MahasiswaInsert;
};

export type UseAddMahasiswaOptions = {
	onSuccess: (
		data: AxiosResponse,
		variables: AddMahasiswaParams,
		context: unknown,
	) => void;
	onError: (
		error: Error,
		variables: AddMahasiswaParams,
		context: unknown,
	) => unknown;
};

export const addMahasiswaValidator: z.ZodType<MahasiswaInsert> = z.object({
	nama: z.string(),
	nim: z.string(),
	tanggal_lahir: z.string(),
	no_telepon: z.string().optional(),
	alamat: alamatValidator,
});

export const addMahasiswa = async ({ data }: AddMahasiswaParams) => {
	const validatedData = await addMahasiswaValidator.parseAsync(data);

	return api.post(`/mahasiswa`, validatedData);
};

export const useAddMahasiswa = ({
	onSuccess,
	onError,
}: UseAddMahasiswaOptions) => {
	return useMutation({ onSuccess, onError, mutationFn: addMahasiswa });
};
