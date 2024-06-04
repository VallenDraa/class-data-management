import * as React from 'react';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	VirtualItemWrapper,
} from '~/components/ui';
import { AdminMahasiswaEditForm } from './admin-mahasiswa-edit-form';
import { MahasiswaHistoryList } from './mahasiswa-history-list';
import { MahasiswaHistoryItem } from './mahasiswa-history-item';
import { useHandleAdminMahasiswaUpdate } from '../hooks/use-handle-admin-mahasiswa-update';
import { useHandleMahasiwaDelete } from '../hooks';
import { Mahasiswa } from '~/features/mahasiswa/types';

// eslint-disable-next-line react-refresh/only-export-components
export const mahasiswaProfileDetailTabs = {
	profile: 'profil',
	userActivity: 'aktivitas user',
};

export type AdminMahasiswaProfileDetailProps = {
	mahasiswa: Mahasiswa;
};

export function AdminMahasiswaProfileDetail(
	props: AdminMahasiswaProfileDetailProps,
) {
	const { mahasiswa } = props;

	const [activeTab, setActiveTab] = React.useState(
		mahasiswaProfileDetailTabs.profile,
	);

	const { handleAdminMahasiswaUpdate } = useHandleAdminMahasiswaUpdate(
		mahasiswa.id,
	);
	const { handleMahasiswaDelete, isDeleting } = useHandleMahasiwaDelete(
		mahasiswa.id,
	);

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
				<AdminMahasiswaEditForm
					mahasiswa={mahasiswa}
					isDeleting={isDeleting}
					onDataUpdate={handleAdminMahasiswaUpdate}
					onMahasiswaDelete={handleMahasiswaDelete}
				/>
			</TabsContent>

			<TabsContent
				className="overflow-auto grow"
				value={mahasiswaProfileDetailTabs.userActivity}
			>
				<MahasiswaHistoryList mahasiswaId={mahasiswa.id}>
					{(history, virtualItem) => {
						if (history === undefined) {
							return (
								<VirtualItemWrapper
									key={virtualItem.key}
									virtualItem={virtualItem}
								>
									Gagal mengambil data mahasiswa
								</VirtualItemWrapper>
							);
						}

						return (
							<VirtualItemWrapper
								key={virtualItem.key}
								virtualItem={virtualItem}
							>
								<MahasiswaHistoryItem history={history} />
							</VirtualItemWrapper>
						);
					}}
				</MahasiswaHistoryList>
			</TabsContent>
		</Tabs>
	);
}
