import { HomePageLayout } from '~/components/layouts';
import {
	type MahasiswaInsert,
	type MahasiswaSearchSortType,
} from '~/features/mahasiswa/types';
import {
	MahasiswaSearchBar,
	MahasiswaList,
} from '~/features/mahasiswa/components';
import { useUrlState } from '~/hooks';
import { useParams } from 'react-router-dom';
import {
	AdminMahasiswaListItem,
	AdminSelfProfile,
	CreateMahasiswaDialog,
	AdminSeeMahasiwaDetailOnVisit,
	SeeAdminDetailOnVisit,
} from '../components';

export function MainAdminPage() {
	const { mahasiswaId } = useParams();
	const { adminId } = useParams();

	const [activeKeyword, setActiveKeyword] = useUrlState<string>('keyword', '');
	const [activeSort, setActiveSort] = useUrlState<MahasiswaSearchSortType>(
		'sort_by',
		'terbaru',
	);

	const handleAddMahasiswa = (data: MahasiswaInsert) => {
		console.log('🚀 ~ handleAddMahasiswa ~ data:', data);
	};

	return (
		<HomePageLayout>
			<SeeAdminDetailOnVisit
				adminId={Number(adminId)}
				navigatePathOnClose="/admin"
			/>
			<AdminSeeMahasiwaDetailOnVisit
				navigatePathOnClose="/admin"
				mahasiswaId={Number(mahasiswaId)}
			/>

			<header className="flex items-center justify-between px-1 py-4">
				<h1 className="text-lg font-semibold leading-7">Admin</h1>

				<AdminSelfProfile />
			</header>

			<main className="flex flex-col gap-4 grow relative">
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
								<AdminMahasiswaListItem mahasiswa={mahasiswa} />
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
