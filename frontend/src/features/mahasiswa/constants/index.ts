import { MahasiswaSearchSortType } from '../types';

export const QUERY_KEY = 'mahasiswa';

export const SORT_SEARCH_TYPES: Array<{
	value: MahasiswaSearchSortType;
	label: string;
}> = [
	{ value: 'newest', label: 'Newest' },
	{ value: 'asc', label: 'Ascending' },
	{ value: 'desc', label: 'Descending' },
];
