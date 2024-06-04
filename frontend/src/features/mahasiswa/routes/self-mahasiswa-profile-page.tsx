import { Link } from 'react-router-dom';
import { useGetMahasiswaSelf } from '../api';
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

export function SelfMahasiswaProfilePage() {
	const { data, error, isLoading } = useGetMahasiswaSelf();

	const { toMahasiswaMainPath } = useHandleMahasiswaPath(data?.id ?? 0);

	const { handleMahasiswaDataUpdate } = useHandleMahasiswaDataUpdate(
		data?.id ?? 0,
	);
	const { handleMahasiswaAvatarUpdate } = useHandleMahasiswaAvatarUpdate(
		data?.id ?? 0,
	);
	const { handleMahasiswaPasswordUpdate } = useHandleMahasiswaPasswordUpdate();

	return (
		<HomePageLayout>
			<HomeHeaderLayout isAdmin={false} title="Profil Anda">
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
						title="Gagal memuat data profile anda"
					/>
				)}

				{(isLoading || !data) && <MahasiswaEditSkeleton />}

				{data && (
					<MahasiswaEditForm
						isOwnProfile
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
