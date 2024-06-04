/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { MahasiswaSearchSortType } from '~/features/mahasiswa/types';
import { useDebouncedUrlKeyword, useUrlState } from '~/hooks';

export const SORT_SEARCH_TYPES: Array<{
	value: MahasiswaSearchSortType;
	label: string;
}> = [
	{ value: 'terbaru', label: 'Terbaru' },
	{ value: 'terlama', label: 'Terlama' },
	{ value: 'az', label: 'A-Z' },
	{ value: 'za', label: 'Z-A' },
];

export const AppSearchQueryContext = React.createContext<{
	activeKeyword: string;
	setActiveKeyword: (keyword: string) => void;
	activeSort: MahasiswaSearchSortType;
	setActiveSort: (sort: MahasiswaSearchSortType) => void;
}>({
	activeKeyword: '',
	setActiveKeyword() {},
	activeSort: 'terbaru',
	setActiveSort() {},
});

export const useAppSearchQueryContext = () =>
	React.useContext(AppSearchQueryContext);

export function AppSearchQueryContextProvider(props: {
	children: React.ReactNode;
}) {
	const { activeKeyword, setActiveKeyword } = useDebouncedUrlKeyword(500);
	const [activeSort, setActiveSort] = useUrlState<MahasiswaSearchSortType>(
		'sort_by',
		'terbaru',
	);

	React.useEffect(() => {
		if (SORT_SEARCH_TYPES.every(type => type.value !== activeSort)) {
			setActiveSort('terbaru');
		}
	}, [activeSort, setActiveSort]);

	const values = React.useMemo(
		() => ({
			activeKeyword,
			setActiveKeyword,
			activeSort,
			setActiveSort,
		}),
		[activeKeyword, setActiveKeyword, activeSort, setActiveSort],
	);

	return (
		<AppSearchQueryContext.Provider value={values}>
			{props.children}
		</AppSearchQueryContext.Provider>
	);
}
