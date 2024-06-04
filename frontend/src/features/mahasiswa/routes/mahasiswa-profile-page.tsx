import { Link, useParams } from 'react-router-dom';
import { useGetSingleMahasiswa } from '../api';
import { HomeHeaderLayout, HomePageLayout } from '~/components/layouts/home';
import {
	MahasiswaSelfProfile,
	MahasiswaEditForm,
	MahasiswaEditSkeleton,
} from '../components';
import {
	useHandleMahasiswaAvatarUpdate,
	useHandleMahasiswaDataUpdate,
	useHandleMahasiswaPasswordUpdate,
	useHandleMahasiswaPath,
} from '../hooks';
import { buttonVariants, ErrorMessageSection } from '~/components/ui';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { cn } from '~/utils/shadcn';

export function MahasiswaProfilePage() {
	const { mahasiswaId } = useParams();
	const numberMahasiswaId = Number(mahasiswaId);

	const { data, error, isLoading } = useGetSingleMahasiswa({
		id: numberMahasiswaId,
	});

	const { toMahasiswaMainPath } = useHandleMahasiswaPath(numberMahasiswaId);

	const { handleMahasiswaDataUpdate } =
		useHandleMahasiswaDataUpdate(numberMahasiswaId);
	const { handleMahasiswaAvatarUpdate } =
		useHandleMahasiswaAvatarUpdate(numberMahasiswaId);
	const { handleMahasiswaPasswordUpdate } = useHandleMahasiswaPasswordUpdate();

	return (
		<HomePageLayout>
			<HomeHeaderLayout isAdmin={false} title={`Profil Mahasiswa`}>
				<MahasiswaSelfProfile />
			</HomeHeaderLayout>

			<main className="flex flex-col gap-2 grow">
				<Link
					to={toMahasiswaMainPath()}
					className={cn(
						buttonVariants({ variant: 'link' }),
						'self-start gap-1',
					)}
				>
					<ArrowLeftIcon />
					<span>Kembali</span>
				</Link>

				{error && (
					<ErrorMessageSection
						refreshPage
						message={error.message}
						title="Gagal memuat data mahasiswa"
					/>
				)}

				{(isLoading || !data) && <MahasiswaEditSkeleton />}

				{data && (
					<MahasiswaEditForm
						isOwnProfile={false}
						onPasswordUpdate={handleMahasiswaPasswordUpdate}
						onAvatarUpdate={handleMahasiswaAvatarUpdate}
						onDataUpdate={handleMahasiswaDataUpdate}
						mahasiswa={data}
					/>
				)}
			</main>
		</HomePageLayout>
	);
}
