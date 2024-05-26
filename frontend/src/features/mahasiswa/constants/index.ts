import { MahasiswaSearchSortType } from '../types';

export const QUERY_KEY = 'mahasiswa';

export const SORT_SEARCH_TYPES: Array<{
	value: MahasiswaSearchSortType;
	label: string;
}> = [
	{ value: 'terbaru', label: 'Terbaru' },
	{ value: 'terlama', label: 'Terlama' },
	{ value: 'az', label: 'A-Z' },
	{ value: 'za', label: 'Z-A' },
];
