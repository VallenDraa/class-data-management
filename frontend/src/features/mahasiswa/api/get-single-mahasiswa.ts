import { type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { MAHASISWA_QUERY_KEY } from '../constants';
import { idValidator } from '~/utils/validators';

export type GetSingleMahasiswaParams = {
	id: number;
};

export const getSingleMahasiswa = async ({ id }: GetSingleMahasiswaParams) => {
	const validatedMahasiswaId = await idValidator.parseAsync(id);

	const { data } = await api.get<Mahasiswa>(
		`/mahasiswa/${validatedMahasiswaId}`,
	);

	return data;
};

export type UseGetSingleMahasiswaOptions = Omit<
	UseQueryOptions<Mahasiswa>,
	'queryKey' | 'queryFn'
> &
	GetSingleMahasiswaParams;

export const useGetSingleMahasiswa = ({
	id,
	...props
}: UseGetSingleMahasiswaOptions) => {
	return useQuery({
		...props,
		queryKey: [MAHASISWA_QUERY_KEY, id],
		queryFn: () => getSingleMahasiswa({ id }),
	});
};
