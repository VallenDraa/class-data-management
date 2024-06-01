import { HomePageLayout, HomeHeaderLayout } from '~/components/layouts/home';
import {
	MahasiswaSearchBar,
	MahasiswaList,
} from '~/features/mahasiswa/components';
import { useParams } from 'react-router-dom';
import {
	AdminMahasiswaListItem,
	AdminSelfProfile,
	CreateMahasiswaDialog,
	AdminSeeMahasiwaDetailOnVisit,
	SeeAdminDetailOnVisit,
} from '../components';
import { useHandleMahasiswaAdd } from '../hooks';
import { useAppSearchQueryContext } from '~/providers';
import { AdminMahasiswaDetailStatusContextProvider } from '../providers';

export function MainAdminPage() {
	const { activeKeyword, activeSort, setActiveKeyword, setActiveSort } =
		useAppSearchQueryContext();

	const { mahasiswaId } = useParams();
	const { adminId } = useParams();

	const { handleAddMahasiswa } = useHandleMahasiswaAdd();

	return (
		<HomePageLayout>
			<SeeAdminDetailOnVisit adminId={Number(adminId)} />
			<AdminSeeMahasiwaDetailOnVisit mahasiswaId={Number(mahasiswaId)} />

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

				<MahasiswaList sort={activeSort} keyword={activeKeyword}>
					{(mahasiswa, virtualItem) => {
						if (mahasiswa === undefined) {
							return (
								<li
									key={virtualItem.key}
									className="absolute pt-1 inset-x-1"
									style={{
										height: `${virtualItem.size}px`,
										transform: `translateY(${virtualItem.start}px)`,
									}}
								>
									Gagal mengambil data mahasiswa
								</li>
							);
						}

						return (
							<li
								key={virtualItem.key}
								className="absolute pt-1 inset-x-1"
								style={{
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
							>
								<AdminMahasiswaDetailStatusContextProvider>
									<AdminMahasiswaListItem mahasiswa={mahasiswa} />
								</AdminMahasiswaDetailStatusContextProvider>
							</li>
						);
					}}
				</MahasiswaList>

				<div className="absolute right-1 bottom-2">
					<CreateMahasiswaDialog onCreate={handleAddMahasiswa} />
				</div>
			</main>
		</HomePageLayout>
	);
}
