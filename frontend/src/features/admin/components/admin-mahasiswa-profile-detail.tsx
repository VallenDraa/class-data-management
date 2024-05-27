import * as React from 'react';
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '~/components/ui';
import {
	AdminMahasiswaEditForm,
	AdminMahasiswaEditFormSkeleton,
} from './admin-mahasiswa-edit-form';
import { useGetSingleMahasiswa } from '~/features/mahasiswa/api';
import { MahasiswaUpdate } from '~/features/mahasiswa/types';
import { MahasiswaHistoryList } from './mahasiswa-history-list';
import { MahasiswaHistoryItem } from './mahasiswa-history-item';
import { cn } from '~/utils/shadcn';

export type MahasiswaProfileDetailProps = {
	isDetailOpen: boolean;
	detailTitle?: string;
	mahasiswaId: number;
	onDetailClose?: () => void;
};

const mahasiswaProfileDetailTabs = {
	profile: 'profil',
	userActivity: 'aktivitas user',
};

export function AdminMahasiswaProfileDetail(
	props: MahasiswaProfileDetailProps,
) {
	const { isDetailOpen, detailTitle, mahasiswaId, onDetailClose } = props;

	const {
		data: mahasiswa,
		isLoading: isMahasiswaLoading,
		error,
	} = useGetSingleMahasiswa({ id: Number(mahasiswaId), enabled: isDetailOpen });

	const [activeTab, setActiveTab] = React.useState(
		mahasiswaProfileDetailTabs.profile,
	);

	const handleSubmit = (data: MahasiswaUpdate) => {
		console.log(data);
	};

	return (
		<DialogContent
			className="h-screen sm:h-max flex flex-col"
			onClose={onDetailClose}
			onEscapeKeyDown={onDetailClose}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">
					{detailTitle || (
						<>
							{!mahasiswa && isMahasiswaLoading ? (
								<Skeleton className="h-8 w-1/3" />
							) : (
								`Profil ${mahasiswa?.nama ?? 'Mahasiswa'}`
							)}
						</>
					)}
				</DialogTitle>
			</DialogHeader>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				defaultValue={mahasiswaProfileDetailTabs.profile}
				className="w-full h-full grow"
			>
				<TabsList className="flex w-full">
					{Object.keys(mahasiswaProfileDetailTabs).map(tabKey => {
						const tab =
							mahasiswaProfileDetailTabs[
								tabKey as keyof typeof mahasiswaProfileDetailTabs
							];

						return (
							<TabsTrigger
								className="capitalize basis-1/2"
								key={tab}
								value={tab}
							>
								{tab}
							</TabsTrigger>
						);
					})}
				</TabsList>

				<TabsContent
					className={cn(
						'flex flex-col',
						activeTab === mahasiswaProfileDetailTabs.profile && 'h-full grow',
					)}
					value={mahasiswaProfileDetailTabs.profile}
				>
					{!error ? (
						isDetailOpen && !isMahasiswaLoading && mahasiswa ? (
							<AdminMahasiswaEditForm
								onSubmit={handleSubmit}
								user={mahasiswa}
							/>
						) : (
							<AdminMahasiswaEditFormSkeleton />
						)
					) : (
						<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
							<p>{error.message}</p>
						</div>
					)}
				</TabsContent>

				<TabsContent
					className={cn(
						'flex flex-col',
						activeTab === mahasiswaProfileDetailTabs.userActivity &&
							'h-full grow',
					)}
					value={mahasiswaProfileDetailTabs.userActivity}
				>
					<MahasiswaHistoryList mahasiswaId={mahasiswaId}>
						{(history, virtualItem) => {
							if (history === undefined) {
								return (
									<li
										className="absolute inset-x-1"
										style={{
											height: `${virtualItem.size}px`,
											transform: `translateY(${virtualItem.start}px)`,
										}}
										key={virtualItem.key}
									>
										Gagal mengambil data mahasiswa
									</li>
								);
							}

							return (
								<li
									className="absolute inset-x-1"
									style={{
										height: `${virtualItem.size}px`,
										transform: `translateY(${virtualItem.start}px)`,
									}}
									key={virtualItem.key}
								>
									<MahasiswaHistoryItem
										key={virtualItem.key}
										history={history}
									/>
								</li>
							);
						}}
					</MahasiswaHistoryList>
				</TabsContent>
			</Tabs>
		</DialogContent>
	);
}
