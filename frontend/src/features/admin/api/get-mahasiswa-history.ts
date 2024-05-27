import {
	type GetMahasiswaHistorySearchParams,
	type MahasiswaHistory,
} from '../types';
import { api } from '~/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { HISTORY_MAHASISWA_QUERY_KEY } from '../constants';

export const getMahasiswaHistory = async ({
	page = 1,
	mahasiswaId,
}: GetMahasiswaHistorySearchParams) => {
	if (page < 1) {
		throw new Error('Halaman harus lebih besar dari 0!');
	}

	const endPoint = `/history_mahasiswa?mahasiswa_id=${mahasiswaId}&page=${page}`;

	const { data } = await api.get<MahasiswaHistory[]>(endPoint);

	return data;
};

export const useGetMahasiswaHistory = (
	queryParameter: GetMahasiswaHistorySearchParams,
) => {
	return useQuery({
		queryKey: [HISTORY_MAHASISWA_QUERY_KEY, queryParameter],
		queryFn: () => getMahasiswaHistory(queryParameter),
	});
};
