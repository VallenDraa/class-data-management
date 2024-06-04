import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	VirtualItemWrapper,
} from '~/components/ui';
import {
	AdminMahasiswaEditForm,
	mahasiswaProfileDetailTabs,
} from '~/features/admin/components';
import { Mahasiswa } from '~/features/mahasiswa/types';
import { TourMahasiswaHistoryList } from './tour-mahasiswa-history-list';
import { MahasiswaHistoryItem } from '~/features/admin/components/mahasiswa-history-item';
import { MahasiswaHistory } from '~/features/admin/types';
import { VOID_FN } from '~/constants/placeholders';

export type TourAdminMahasiswaProfileDetailProps = {
	historyItems?: MahasiswaHistory[];
	mahasiswa: Mahasiswa;
	activeTab: 'profil' | 'aktivitas user';
	setActiveTab: (tab: string) => void;
};

export function TourAdminMahasiswaProfileDetail(
	props: TourAdminMahasiswaProfileDetailProps,
) {
	const { mahasiswa, historyItems = [], activeTab, setActiveTab } = props;

	return (
		<Tabs
			value={activeTab}
			onValueChange={setActiveTab}
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
					isDeleting={false}
					mahasiswa={mahasiswa}
					onDataUpdate={VOID_FN}
					onMahasiswaDelete={VOID_FN}
				/>
			</TabsContent>

			<TabsContent
				className="overflow-auto grow"
				value={mahasiswaProfileDetailTabs.userActivity}
			>
				<TourMahasiswaHistoryList itemCount={historyItems.length}>
					{virtualItem => {
						const history = historyItems[virtualItem.index];

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
								<MahasiswaHistoryItem key={virtualItem.key} history={history} />
							</VirtualItemWrapper>
						);
					}}
				</TourMahasiswaHistoryList>
			</TabsContent>
		</Tabs>
	);
}
