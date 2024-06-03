import * as React from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { ScrollArea } from '~/components/ui';

export type TourMahasiswaListProps = {
	itemCount: number;
	children: (virtualItem: VirtualItem) => React.ReactNode;
};

export function TourMahasiswaList(props: TourMahasiswaListProps) {
	const { children, itemCount } = props;

	const mahasiswaListContainerRef = React.useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: itemCount,
		getScrollElement: () => mahasiswaListContainerRef.current,
		estimateSize: () => 77,
	});

	return (
		<ScrollArea
			id="search-results"
			className="h-1 overflow-y-auto grow"
			ref={mahasiswaListContainerRef}
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
