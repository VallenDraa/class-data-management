import * as React from 'react';
import {
	ErrorMessageSection,
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
import { useHandleAdminMahasiswaUpdate } from '../hooks/use-handle-admin-mahasiswa-update';
import { useHandleMahasiwaDelete } from '../hooks';

const mahasiswaProfileDetailTabs = {
	profile: 'profil',
	userActivity: 'aktivitas user',
};

export type MahasiswaProfileDetailProps = {
	mahasiswaId: number;
};

export function AdminMahasiswaProfileDetail(
	props: MahasiswaProfileDetailProps,
) {
	const { mahasiswaId } = props;

	const [activeTab, setActiveTab] = React.useState(
		mahasiswaProfileDetailTabs.profile,
	);

	const {
		data: mahasiswa,
		isLoading: isMahasiswaLoading,
		error,
	} = useGetSingleMahasiswa({ id: mahasiswaId });
	const { handleAdminMahasiswaUpdate } =
		useHandleAdminMahasiswaUpdate(mahasiswaId);
	const { handleMahasiswaDelete, isDeleting } =
		useHandleMahasiwaDelete(mahasiswaId);

	return (
		<Tabs
			value={activeTab}
			onValueChange={setActiveTab}
			defaultValue={mahasiswaProfileDetailTabs.profile}
			className="flex flex-col h-1 mt-1 grow"
		>
			<TabsList className="flex w-full">
				{Object.keys(mahasiswaProfileDetailTabs).map(tabKey => {
					const tab =
						mahasiswaProfileDetailTabs[
							tabKey as keyof typeof mahasiswaProfileDetailTabs
						];

					return (
						<TabsTrigger className="capitalize basis-1/2" key={tab} value={tab}>
							{tab}
						</TabsTrigger>
					);
				})}
			</TabsList>

			<TabsContent
				className="mt-2.5 overflow-auto grow"
				value={mahasiswaProfileDetailTabs.profile}
			>
				{error && (
					<ErrorMessageSection
						refreshPage
						message={error.message}
						title="Gagal mengambil data mahasiswa"
					/>
				)}

				{isMahasiswaLoading && !mahasiswa && <AdminMahasiswaEditFormSkeleton />}

				{mahasiswa && (
					<AdminMahasiswaEditForm
						mahasiswa={mahasiswa}
						isDeleting={isDeleting}
						onDataUpdate={handleAdminMahasiswaUpdate}
						onMahasiswaDelete={handleMahasiswaDelete}
					/>
				)}
			</TabsContent>

			<TabsContent
				className="overflow-auto grow"
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
								<MahasiswaHistoryItem key={virtualItem.key} history={history} />
							</li>
						);
					}}
				</MahasiswaHistoryList>
			</TabsContent>
		</Tabs>
	);
}
