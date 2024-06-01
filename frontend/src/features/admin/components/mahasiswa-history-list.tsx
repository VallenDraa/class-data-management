import * as React from 'react';
import { type MahasiswaHistory } from '../types';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { useGetMahasiswaHistory } from '../api';
import { ErrorMessageSection, ScrollArea, Skeleton } from '~/components/ui';
import { useIntersectionObserver } from '~/hooks';

function MahasiswaHistoryListSkeleton() {
	return (
		<div className="space-y-1">
			<Skeleton className="w-full h-[75px] rounded-md" />
			<Skeleton className="w-full h-[75px] rounded-md" />
			<Skeleton className="w-full h-[75px] rounded-md" />
			<Skeleton className="w-full h-[75px] rounded-md" />
			<Skeleton className="w-full h-[75px] rounded-md" />
		</div>
	);
}

export type MahasiswaHistoryListProps = {
	mahasiswaId: number;
	children: (
		historyItem: MahasiswaHistory | undefined,
		virtualItem: VirtualItem,
		allHistory: MahasiswaHistory[],
	) => React.ReactNode;
};

export function MahasiswaHistoryList(props: MahasiswaHistoryListProps) {
	const { mahasiswaId, children } = props;

	const {
		data: mahasiswaHistoryList,
		isLoading,
		error,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useGetMahasiswaHistory({ mahasiswaId });

	const mahasiswaHistoryListContainerRef = React.useRef<HTMLDivElement>(null);
	const allRows = React.useMemo(
		() =>
			mahasiswaHistoryList
				? mahasiswaHistoryList.pages.flatMap(d => d.success.data)
				: [],
		[mahasiswaHistoryList],
	);
	const rowVirtualizer = useVirtualizer({
		count: allRows.length,
		getScrollElement: () => mahasiswaHistoryListContainerRef.current,
		estimateSize: () => 110,
	});

	const [dataLoaderRef] = useIntersectionObserver({
		onChange: isIntersecting => {
			if (!isIntersecting) {
				return;
			}

			if (hasNextPage && !isFetchingNextPage) {
				if (isNaN(mahasiswaId)) {
					return;
				}

				fetchNextPage();
			}
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	return isLoading ? (
		<MahasiswaHistoryListSkeleton />
	) : (
		<ScrollArea
			className="h-full overflow-y-auto grow"
			ref={mahasiswaHistoryListContainerRef}
		>
			<ul
				className="relative w-full"
				style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
			>
				{allRows.length > 0 ? (
					rowVirtualizer.getVirtualItems().map(virtualItem => {
						const isLoaderRow = virtualItem.index > allRows.length - 1;
						const historyItem = allRows[virtualItem.index];

						return isLoaderRow ? (
							<li
								ref={dataLoaderRef}
								key={virtualItem.key}
								className="absolute inset-x-1"
								style={{
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
							>
								Loading...
							</li>
						) : (
							children(historyItem, virtualItem, allRows)
						);
					})
				) : (
					<ErrorMessageSection
						title="Tidak Ada Riwayat"
						message="User ini belum melakukan aktivitas apapun pada aplikasi ini."
					/>
				)}
			</ul>
		</ScrollArea>
	);
}
