import { type GetMahasiswaSearchParams, type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants';

export const getMahasiswa = async ({
	page = 1,
	sort = 'newest',
	keyword = '',
}: GetMahasiswaSearchParams) => {
	if (page < 1) {
		throw new Error('Halaman harus lebih besar dari 0!');
	}

	let endPoint = `/mahasiswa?page=${page}&sort=${sort}`;

	if (keyword) {
		endPoint += `&keyword=${keyword}`;
	}

	const { data } = await api.get<Mahasiswa[]>(endPoint);

	return data;
};

export const useGetMahasiswa = (queryParameter: GetMahasiswaSearchParams) => {
	return useQuery({
		queryKey: [QUERY_KEY, queryParameter],
		queryFn: () => getMahasiswa(queryParameter),
	});
};
