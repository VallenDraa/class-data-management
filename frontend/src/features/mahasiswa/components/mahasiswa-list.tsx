import * as React from 'react';
import { type MahasiswaPreview, type MahasiswaSearchSortType } from '../types';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { ErrorMessageSection, ScrollArea, Skeleton } from '~/components/ui';
import { useGetMahasiswa } from '../api';
import { useIntersectionObserver } from '~/hooks';

function MahasiswaListSkeleton() {
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

export type MahasiswaListProps = {
	keyword: string;
	sort: MahasiswaSearchSortType;
	children: (
		mahasiswa: MahasiswaPreview | undefined,
		virtualItem: VirtualItem,
		allMahasiswa: MahasiswaPreview[],
	) => React.ReactNode;
};

export function MahasiswaList(props: MahasiswaListProps) {
	const { keyword, sort, children } = props;

	const {
		data: mahasiswaList,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useGetMahasiswa({
		keyword,
		sort,
	});

	const mahasiswaListContainerRef = React.useRef<HTMLDivElement>(null);
	const allRows = React.useMemo(
		() =>
			mahasiswaList ? mahasiswaList.pages.flatMap(d => d.success.data) : [],
		[mahasiswaList],
	);
	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? allRows.length + 1 : allRows.length,
		getScrollElement: () => mahasiswaListContainerRef.current,
		estimateSize: () => 77,
	});

	const [dataLoaderRef] = useIntersectionObserver({
		onChange: isIntersecting => {
			if (!isIntersecting) {
				return;
			}

			if (hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		},
	});

	return (
		<div id="search-results" className="flex flex-col h-full grow">
			{isLoading ? (
				<MahasiswaListSkeleton />
			) : (
				<ScrollArea
					className="h-1 overflow-y-auto grow"
					ref={mahasiswaListContainerRef}
				>
					<ul
						className="relative w-full"
						style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
					>
						{allRows.length > 0 ? (
							rowVirtualizer.getVirtualItems().map(virtualItem => {
								const isLoaderRow = virtualItem.index > allRows.length - 1;
								const mahasiswa = allRows[virtualItem.index];

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
										<Skeleton className="w-full h-full rounded-md" />
									</li>
								) : (
									children(mahasiswa, virtualItem, allRows)
								);
							})
						) : (
							<ErrorMessageSection
								title="Tidak Ada Mahasiswa"
								message="Belum ada data mahasiswa, silahkan buat baru."
							/>
						)}
					</ul>
				</ScrollArea>
			)}
		</div>
	);
}
