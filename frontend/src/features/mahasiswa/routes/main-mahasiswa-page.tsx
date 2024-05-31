import { HomePageLayout } from '~/components/layouts';
import {
	MahasiswaSelfProfile,
	MahasiswaSearchBar,
	MahasiswaList,
	SeeMahasiwaDetailOnVisit,
	MahasiswaListItem,
} from '../components';
import { useParams } from 'react-router-dom';
import { Dialog, ThemeChooser } from '~/components/ui';
import { useGetMahasiswaSelf } from '../api';
import { useAppSearchQuery } from '~/providers';

export function MainMahasiswaPage() {
	const { mahasiswaId } = useParams();
	const { data: mahasiswaSelf } = useGetMahasiswaSelf();

	const { activeKeyword, activeSort, setActiveKeyword, setActiveSort } =
		useAppSearchQuery();

	return (
		<HomePageLayout>
			<Dialog open>
				<SeeMahasiwaDetailOnVisit
					navigatePathOnClose="/mahasiswa"
					isOwnProfile={Number(mahasiswaId) === mahasiswaSelf?.id}
					mahasiswaId={Number(mahasiswaId)}
				/>
			</Dialog>

			<header className="flex items-center justify-between px-1 py-4">
				<h1 className="text-lg font-semibold leading-7">Kelass</h1>

				<div className="flex items-center justify-end gap-4">
					<ThemeChooser />
					<MahasiswaSelfProfile />
				</div>
			</header>

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
								<MahasiswaListItem
									isOwnProfile={Number(mahasiswa.id) === mahasiswaSelf?.id}
									mahasiswa={mahasiswa}
								/>
							</li>
						);
					}}
				</MahasiswaList>
			</main>
		</HomePageLayout>
	);
}
