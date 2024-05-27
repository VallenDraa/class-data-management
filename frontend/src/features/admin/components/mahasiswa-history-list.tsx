import * as React from 'react';
import { type MahasiswaHistory } from '../types';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { useGetMahasiswaHistory } from '../api';
import { ScrollArea } from '~/components/ui';

export type MahasiswaHistoryListProps = {
	mahasiswaId: number;
	children: (
		historyItem: MahasiswaHistory | undefined,
		virtualItem: VirtualItem,
	) => React.ReactNode;
};

export function MahasiswaHistoryList(props: MahasiswaHistoryListProps) {
	const { mahasiswaId, children } = props;

	const { data: mahasiswaHistoryList, isLoading } = useGetMahasiswaHistory({
		page: 1,
		mahasiswaId,
	});

	const mahasiswaHistoryListContainerRef = React.useRef<HTMLDivElement>(null);
	const rowVirtualizer = useVirtualizer({
		count: mahasiswaHistoryList?.length ?? 5,
		getScrollElement: () => mahasiswaHistoryListContainerRef.current,
		estimateSize: () => 128,
	});

	return isLoading ? (
		'loading...'
	) : (
		<ScrollArea
			className="overflow-y-auto grow h-full sm:h-96"
			ref={mahasiswaHistoryListContainerRef}
		>
			<ul
				className="relative w-full"
				style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
			>
				{rowVirtualizer.getVirtualItems().map(virtualItem => {
					const historyItem = mahasiswaHistoryList?.[virtualItem.index];

					return children(historyItem, virtualItem);
				})}
			</ul>
		</ScrollArea>
	);
}
