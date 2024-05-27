import { HomePageLayout } from '~/components/layouts';
import { type MahasiswaSearchSortType } from '../types';
import {
	MahasiswaSelfProfile,
	MahasiswaSearchBar,
	MahasiswaList,
	SeeMahasiwaDetailOnVisit,
	MahasiswaListItem,
} from '../components';
import { useUrlState } from '~/hooks';
import { useParams } from 'react-router-dom';
import { Dialog } from '~/components/ui';

export function MainMahasiswaPage() {
	const { mahasiswaId } = useParams();
	const [activeKeyword, setActiveKeyword] = useUrlState<string>('keyword', '');
	const [activeSort, setActiveSort] = useUrlState<MahasiswaSearchSortType>(
		'sort_by',
		'terbaru',
	);

	return (
		<HomePageLayout>
			<Dialog open>
				<SeeMahasiwaDetailOnVisit
					//! The isOwnProfle prop is a hardcoded placeholder
					navigatePathOnClose="/mahasiswa"
					isOwnProfile={mahasiswaId === '1'}
					mahasiswaId={Number(mahasiswaId)}
				/>
			</Dialog>

			<header className="flex items-center justify-between px-1 py-4">
				<h1 className="text-lg font-semibold leading-7">Kelass</h1>

				<MahasiswaSelfProfile />
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
									className="absolute inset-x-1"
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
								className="absolute inset-x-1"
								style={{
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
							>
								<MahasiswaListItem
									//! The isOwnProfle prop is a hardcoded placeholder
									isOwnProfile={mahasiswaId === '1'}
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
