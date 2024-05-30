import {
	type GetMahasiswaHistorySearchParams,
	type MahasiswaHistory,
} from '../types';
import { api } from '~/lib/api-client';
import { HISTORY_MAHASISWA_QUERY_KEY } from '../constants';
import { PaginatedApiResponse } from '~/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '~/utils/get-error-message';

export type GetMahasiswaHistoryResponse = PaginatedApiResponse<
	MahasiswaHistory[]
>;

export const ITEMS_PER_PAGE = 15;

export const getMahasiswaHistory = async ({
	page = 1,
	mahasiswaId,
}: GetMahasiswaHistorySearchParams): Promise<GetMahasiswaHistoryResponse> => {
	if (page < 1) {
		throw new Error('Halaman harus lebih besar dari 0!');
	}

	const endPoint = `/mahasiswa/${mahasiswaId}/history?page=${page}&length=${ITEMS_PER_PAGE}`;

	try {
		const { data } = await api.get<GetMahasiswaHistoryResponse>(endPoint);

		return data;
	} catch (error) {
		toast.error(getErrorMessage(error));

		throw error;
	}
};

export const useGetMahasiswaHistory = (
	queryParameter: GetMahasiswaHistorySearchParams,
) => {
	return useInfiniteQuery<GetMahasiswaHistoryResponse>({
		queryKey: [HISTORY_MAHASISWA_QUERY_KEY, queryParameter],
		initialPageParam: 1,
		getNextPageParam: (lastPage, _a, lastPageParam) => {
			const { last_page, next_page } = lastPage.success;

			if (last_page === (lastPageParam as number)) {
				return null;
			}

			return next_page;
		},
		queryFn: ctx =>
			getMahasiswaHistory({
				...queryParameter,
				page: ctx.pageParam as number,
			}),
	});
};
