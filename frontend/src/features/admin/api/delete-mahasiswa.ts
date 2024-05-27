import { api } from '~/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GetMahasiswaSearchParams } from '~/features/mahasiswa/types';
import { QUERY_KEY } from '~/features/mahasiswa/constants';
import { idValidator } from '~/utils/validators';

export type DeleteMahasiswaParams = {
	id: number;
};

export type UseDeleteMahasiswaOptions = {
	searchParams: GetMahasiswaSearchParams;
	onSuccess?: (
		data: AxiosResponse,
		variables: DeleteMahasiswaParams,
		context: unknown,
	) => void;
	onError?: (
		error: Error,
		variables: DeleteMahasiswaParams,
		context: unknown,
	) => unknown;
};

export const deleteMahasiswa = async ({ id }: DeleteMahasiswaParams) => {
	const validatedMahasiswaId = await idValidator.parseAsync(id);

	return api.delete(`/mahasiswa/${validatedMahasiswaId}`);
};

export const useDeleteMahasiswa = ({
	searchParams,
	onSuccess,
	onError,
}: UseDeleteMahasiswaOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteMahasiswa,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY, searchParams] });
			onSuccess?.(data, variables, context);
		},
		onError,
	});
};
