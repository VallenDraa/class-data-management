import { HomePageLayout, HomeHeaderLayout } from '~/components/layouts/home';
import {
	MahasiswaSearchBar,
	MahasiswaList,
} from '~/features/mahasiswa/components';
import {
	AdminMahasiswaListItem,
	AdminSelfProfile,
	CreateMahasiswaDialog,
} from '../components';
import { useHandleMahasiswaAdd } from '../hooks';
import { useAppSearchQueryContext } from '~/providers';
import { AdminMahasiswaDetailStatusContextProvider } from '../providers';
import {
	useDeleteMahasiswaTour,
	useEditAdminMahasiswaTour,
} from '~/features/docs/hooks';
import {
	TourAdminMahasiswaListItem,
	TourMahasiswaList,
} from '~/features/docs/components/tour-placeholders';
import { VirtualItemWrapper } from '~/components/ui';

export function MainAdminPage() {
	const { activeKeyword, activeSort, setActiveKeyword, setActiveSort } =
		useAppSearchQueryContext();

	const { handleAddMahasiswa } = useHandleMahasiswaAdd();

	const { isOnMahasiswaDeleteTour, openMahasiswaDetailProfileDeleteStep } =
		useDeleteMahasiswaTour();
	const { isOnEditAdminMahasiswaTour, openMahasiswaDetailProfileEditStep } =
		useEditAdminMahasiswaTour();

	const isOnTour = isOnMahasiswaDeleteTour || isOnEditAdminMahasiswaTour;

	return (
		<HomePageLayout>
			<HomeHeaderLayout isAdmin title="Admin">
				<AdminSelfProfile />
			</HomeHeaderLayout>

			<main className="relative flex flex-col gap-4 grow">
				<MahasiswaSearchBar
					keyword={activeKeyword}
					onKeywordChange={setActiveKeyword}
					sortType={activeSort}
					onSortTypeChange={setActiveSort}
				/>

				{isOnTour ? (
					<TourMahasiswaList itemCount={1}>
						{virtualItem => (
							<VirtualItemWrapper
								key={virtualItem.key}
								virtualItem={virtualItem}
							>
								<TourAdminMahasiswaListItem
									onClick={() => {
										if (isOnMahasiswaDeleteTour) {
											openMahasiswaDetailProfileDeleteStep();
										}

										if (isOnEditAdminMahasiswaTour) {
											openMahasiswaDetailProfileEditStep();
										}
									}}
								/>
							</VirtualItemWrapper>
						)}
					</TourMahasiswaList>
				) : (
					<MahasiswaList sort={activeSort} keyword={activeKeyword}>
						{(mahasiswa, virtualItem) => {
							if (mahasiswa === undefined) {
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
									<AdminMahasiswaDetailStatusContextProvider>
										<AdminMahasiswaListItem mahasiswa={mahasiswa} />
									</AdminMahasiswaDetailStatusContextProvider>
								</VirtualItemWrapper>
							);
						}}
					</MahasiswaList>
				)}

				<div className="absolute right-1 bottom-2">
					<CreateMahasiswaDialog onCreate={handleAddMahasiswa} />
				</div>
			</main>
		</HomePageLayout>
	);
}
