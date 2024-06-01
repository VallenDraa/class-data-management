import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui';
import { MahasiswaSearchSortType } from '../types';
import React from 'react';
import { SORT_SEARCH_TYPES } from '~/providers';

export type MahasiswaSearchBarProps = {
	keyword: string;
	sortType: string;
	onKeywordChange: (keyword: string) => void;
	onSortTypeChange: (sortType: MahasiswaSearchSortType) => void;
};

export function MahasiswaSearchBar(props: MahasiswaSearchBarProps) {
	const { keyword, onKeywordChange, sortType, onSortTypeChange } = props;

	const [innerKeyword, setInnerKeyword] = React.useState(keyword ?? '');

	const handleSetKeyword = (value: string) => {
		setInnerKeyword(value);
		onKeywordChange(value);
	};

	return (
		<div className="px-1 space-y-2" id="search-bar">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium leading-none">Cari mahasiswa</p>

				<Select
					value={sortType}
					onValueChange={selectedSort =>
						onSortTypeChange(selectedSort as MahasiswaSearchSortType)
					}
				>
					<SelectTrigger id="search-sort-type" className="w-32">
						<SelectValue placeholder="Urutkan" />
					</SelectTrigger>
					<SelectContent>
						{SORT_SEARCH_TYPES.map(type => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				type="search"
				value={innerKeyword ?? ''}
				onChange={e => handleSetKeyword(e.target.value)}
				placeholder="Nama atau NIM mahasiswa..."
				className="w-full mt-2"
			/>
		</div>
	);
}
