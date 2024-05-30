import { HomePageLayout } from '~/components/layouts';
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
import { useAppSearchQuery } from '~/providers';
import { AdminMahasiswaDetailStatusContextProvider } from '../providers';
import { ThemeChooser } from '~/components/ui';

export function MainAdminPage() {
	const { activeKeyword, activeSort, setActiveKeyword, setActiveSort } =
		useAppSearchQuery();

	const { mahasiswaId } = useParams();
	const { adminId } = useParams();

	const { handleAddMahasiswa } = useHandleMahasiswaAdd();

	return (
		<HomePageLayout>
			<SeeAdminDetailOnVisit adminId={Number(adminId)} />
			<AdminSeeMahasiwaDetailOnVisit mahasiswaId={Number(mahasiswaId)} />

			<header className="flex items-center justify-between px-1 py-4">
				<h1 className="text-lg font-semibold leading-7">Admin</h1>

				<div className="flex items-center justify-end gap-4">
					<ThemeChooser />
					<AdminSelfProfile />
				</div>
			</header>

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
