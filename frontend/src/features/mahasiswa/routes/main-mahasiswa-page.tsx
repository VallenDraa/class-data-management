import { HomePageLayout } from '~/components/layouts';
import {
	MahasiswaSelfProfile,
	MahasiswaSearchBar,
	MahasiswaList,
} from '../components';
import { useUrlState } from '~/hooks/use-url-state';
import { type MahasiswaSearchSortType } from '../types';

export function MainMahasiswaPage() {
	const [activeKeyword, setActiveKeyword] = useUrlState<string>('keyword', '');
	const [activeSort, setActiveSort] = useUrlState<MahasiswaSearchSortType>(
		'sort_by',
		'newest',
	);

	return (
		<HomePageLayout>
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
				<MahasiswaList
					isUserAdmin={false}
					sort={activeSort}
					keyword={activeKeyword}
				/>
			</main>
		</HomePageLayout>
	);
}
