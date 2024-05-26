import { type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';

export const getMahasiswaSelf = async () => {
	return (await api.get<Mahasiswa>(`/mahasiswa/1`)).data;
};

export const useGetMahasiswaSelf = () => {
	return useQuery({
		queryKey: [QUERY_KEY, 'self'],
		queryFn: getMahasiswaSelf,
	});
};
