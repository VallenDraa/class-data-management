import * as React from 'react';
import { type MahasiswaSearchSortType } from '../types';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ScrollArea } from '~/components/ui';
import { MahasiswaListItem } from './mahasiswa-list-item';
import { useGetMahasiswa } from '../api';

export type MahasiswaListProps = {
	keyword: string;
	isUserAdmin: boolean;
	sort: MahasiswaSearchSortType;
};

export function MahasiswaList(props: MahasiswaListProps) {
	const { keyword, sort, isUserAdmin } = props;

	const { data: mahasiswaList, isLoading } = useGetMahasiswa({
		keyword,
		page: 20,
		sort,
	});

	const mahasiswaListContainerRef = React.useRef<HTMLDivElement>(null);
	const rowVirtualizer = useVirtualizer({
		count: mahasiswaList?.length ?? 5,
		getScrollElement: () => mahasiswaListContainerRef.current,
		estimateSize: () => 75,
	});

	return isLoading ? (
		'loading...'
	) : (
		<ScrollArea
			className="h-1 overflow-y-auto grow"
			ref={mahasiswaListContainerRef}
		>
			<ul
				className="relative w-full"
				style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
			>
				{rowVirtualizer.getVirtualItems().map(virtualItem => {
					const mahasiswa = mahasiswaList?.[virtualItem.index];

					if (mahasiswa === undefined) {
						return 'missing wkwkwk';
					}

					return (
						<li
							key={virtualItem.key}
							className="absolute inset-x-1"
							style={{
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`,
							}}
						>
							<MahasiswaListItem
								isUserAdmin={isUserAdmin}
								mahasiswa={mahasiswa}
							/>
						</li>
					);
				})}
			</ul>
		</ScrollArea>
	);
}
