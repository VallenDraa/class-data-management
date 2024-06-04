import { type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { MAHASISWA_QUERY_KEY } from '../constants';

export const getMahasiswaSelf = async () => {
	const response = await api.get<Mahasiswa>(`/mahasiswa/self`);

	return response.data;
};

export type UseGetMahasiswaSelfOptions = Omit<
	UndefinedInitialDataOptions<Mahasiswa, Error, Mahasiswa, string[]>,
	'queryKey' | 'queryFn'
>;

export const useGetMahasiswaSelf = (options?: UseGetMahasiswaSelfOptions) => {
	return useQuery({
		...options,
		queryKey: [MAHASISWA_QUERY_KEY, 'self'],
		queryFn: getMahasiswaSelf,
	});
};
