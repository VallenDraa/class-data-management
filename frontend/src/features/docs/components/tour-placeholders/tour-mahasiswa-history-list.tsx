import * as React from 'react';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { ScrollArea } from '~/components/ui';

export type TourMahasiswaHistoryListProps = {
	itemCount: number;
	children: (virtualItem: VirtualItem) => React.ReactNode;
};

export function TourMahasiswaHistoryList(props: TourMahasiswaHistoryListProps) {
	const { itemCount, children } = props;

	const mahasiswaHistoryListContainerRef = React.useRef<HTMLDivElement>(null);
	const rowVirtualizer = useVirtualizer({
		count: itemCount,
		getScrollElement: () => mahasiswaHistoryListContainerRef.current,
		estimateSize: () => 110,
	});

	return (
		<ScrollArea
			className="h-full overflow-y-auto grow"
			ref={mahasiswaHistoryListContainerRef}
		>
			<ul
				className="relative w-full"
				style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
			>
				{rowVirtualizer
					.getVirtualItems()
					.map(virtualItem => children(virtualItem))}
			</ul>
		</ScrollArea>
	);
}
