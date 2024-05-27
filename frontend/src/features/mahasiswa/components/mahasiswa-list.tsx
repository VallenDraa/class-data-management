import * as React from 'react';
import { Mahasiswa, type MahasiswaSearchSortType } from '../types';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { ScrollArea } from '~/components/ui';
import { useGetMahasiswa } from '../api';

export type MahasiswaListProps = {
	keyword: string;
	sort: MahasiswaSearchSortType;
	children: (
		mahasiswa: Mahasiswa | undefined,
		virtualItem: VirtualItem,
	) => React.ReactNode;
};

export function MahasiswaList(props: MahasiswaListProps) {
	const { keyword, sort, children } = props;

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

					return children(mahasiswa, virtualItem);
				})}
			</ul>
		</ScrollArea>
	);
}
