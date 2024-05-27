import { type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';
import { idValidator } from '~/utils/validators';

export type GetSingleMahasiswaParams = {
	id: number;
};

export const GetSingleMahasiswa = async ({ id }: GetSingleMahasiswaParams) => {
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
		queryKey: [QUERY_KEY, id],
		queryFn: () => GetSingleMahasiswa({ id }),
	});
};
