import * as React from 'react';
import {
	DialogContent,
	DialogErrorMessage,
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
import { MahasiswaHistoryList } from './mahasiswa-history-list';
import { MahasiswaHistoryItem } from './mahasiswa-history-item';
import { cn } from '~/utils/shadcn';
import { useHandleAdminMahasiswaUpdate } from '../hooks/use-handle-admin-mahasiswa-update';
import { useHandleMahasiwaDelete } from '../hooks';

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

	const [activeTab, setActiveTab] = React.useState(
		mahasiswaProfileDetailTabs.profile,
	);

	const {
		data: mahasiswa,
		isLoading: isMahasiswaLoading,
		error,
	} = useGetSingleMahasiswa({ id: mahasiswaId, enabled: isDetailOpen });
	const { handleAdminMahasiswaUpdate } =
		useHandleAdminMahasiswaUpdate(mahasiswaId);
	const { handleMahasiswaDelete, isDeleting } =
		useHandleMahasiwaDelete(mahasiswaId);

	return (
		<DialogContent
			className="flex flex-col h-screen sm:h-max"
			onClose={onDetailClose}
			onEscapeKeyDown={onDetailClose}
		>
			<DialogHeader>
				<DialogTitle>
					{detailTitle || (
						<>
							{!mahasiswa && isMahasiswaLoading ? (
								<Skeleton className="w-1/3 h-8" />
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
								mahasiswa={mahasiswa}
								isDeleting={isDeleting}
								onDataUpdate={handleAdminMahasiswaUpdate}
								onMahasiswaDelete={handleMahasiswaDelete}
							/>
						) : (
							<AdminMahasiswaEditFormSkeleton />
						)
					) : (
						<DialogErrorMessage
							refreshPage
							message={error.message}
							title="Gagal mengambil data mahasiswa"
						/>
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
