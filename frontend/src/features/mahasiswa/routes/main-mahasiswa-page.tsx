import { HomePageLayout } from '~/components/layouts/home';
import {
	MahasiswaSearchBar,
	MahasiswaList,
	MahasiswaListItem,
} from '../components';
import { useGetMahasiswaSelf } from '../api';
import { useAppSearchQueryContext } from '~/providers';
import { HomeHeaderLayout } from '~/components/layouts/home';
import { VirtualItemWrapper } from '~/components/ui';
import { getAuthToken } from '~/utils/auth-token';

export function MainMahasiswaPage() {
	const isAuthenticated = Boolean(getAuthToken());
	const { data: mahasiswaSelf } = useGetMahasiswaSelf({
		enabled: isAuthenticated,
	});

	const { activeKeyword, activeSort, setActiveKeyword, setActiveSort } =
		useAppSearchQueryContext();

	return (
		<HomePageLayout>
			<HomeHeaderLayout
				isAuthenticatedMahasiswa={isAuthenticated}
				isAdmin={false}
				title="Kelass"
			/>

			<main className="flex flex-col gap-4 grow">
				<MahasiswaSearchBar
					keyword={activeKeyword}
					onKeywordChange={setActiveKeyword}
					sortType={activeSort}
					onSortTypeChange={setActiveSort}
				/>
				<MahasiswaList sort={activeSort} keyword={activeKeyword}>
					{(mahasiswa, virtualItem) => {
						if (mahasiswa === undefined) {
							return (
								<VirtualItemWrapper virtualItem={virtualItem}>
									Gagal mengambil data mahasiswa
								</VirtualItemWrapper>
							);
						}

						return (
							<VirtualItemWrapper virtualItem={virtualItem}>
								<MahasiswaListItem
									isOwnProfile={Number(mahasiswa.id) === mahasiswaSelf?.id}
									mahasiswa={mahasiswa}
								/>
							</VirtualItemWrapper>
						);
					}}
				</MahasiswaList>
			</main>
		</HomePageLayout>
	);
}
