import { type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { MAHASISWA_QUERY_KEY } from '../constants';

export const getMahasiswaSelf = async () => {
	const response = await api.get<Mahasiswa>(`/mahasiswa/self`);

	return response.data;
};

export const useGetMahasiswaSelf = () => {
	return useQuery({
		queryKey: [MAHASISWA_QUERY_KEY, 'self'],
		queryFn: getMahasiswaSelf,
	});
};
