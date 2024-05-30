import { type GetMahasiswaSearchParams, type Mahasiswa } from '../types';
import { api } from '~/lib/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MAHASISWA_QUERY_KEY } from '../constants';
import { toast } from 'sonner';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';
import { type PaginatedApiResponse } from '~/types';

export type GetMahasiswaResponse = PaginatedApiResponse<Mahasiswa[]>;

export const ITEMS_PER_PAGE = 15;

type InternalGetMahasiswaSearchParams = GetMahasiswaSearchParams & {
	page: number;
};

export const getMahasiswa = async ({
	keyword = '',
	page = 1,
	sort = 'terbaru',
}: InternalGetMahasiswaSearchParams): Promise<GetMahasiswaResponse> => {
	if (page < 1) {
		throw new Error('Halaman harus lebih besar dari 0!');
	}

	let endPoint = `/mahasiswa?page=${page}&sort=${sort}&length=${ITEMS_PER_PAGE}`;

	if (keyword) {
		endPoint += `&search=${keyword}`;
	}

	try {
		const response = await api.get<GetMahasiswaResponse>(endPoint);

		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(getErrorMessage(error));
		} else {
			toast.error(DEFAULT_ERROR_MESSAGE);
		}

		throw error;
	}
};

export const useGetMahasiswa = (queryParameter: GetMahasiswaSearchParams) => {
	return useInfiniteQuery<GetMahasiswaResponse>({
		queryKey: [MAHASISWA_QUERY_KEY, queryParameter],
		initialPageParam: 1,
		getNextPageParam: (lastPage, _a, lastPageParam) => {
			const { last_page, next_page } = lastPage.success;

			if (last_page === (lastPageParam as number)) {
				return null;
			}

			return next_page;
		},
		queryFn: ctx => {
			return getMahasiswa({
				...queryParameter,
				page: ctx.pageParam as number,
			});
		},
	});
};
