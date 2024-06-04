import { Link, useParams } from 'react-router-dom';
import { useGetSingleMahasiswa } from '../api';
import { HomePageLayout } from '~/components/layouts/home';
import { MahasiswaEditForm, MahasiswaEditSkeleton } from '../components';
import {
	useHandleMahasiswaAvatarUpdate,
	useHandleMahasiswaDataUpdate,
	useHandleMahasiswaPasswordUpdate,
	useHandleMahasiswaPath,
} from '../hooks';
import { buttonVariants, ErrorMessageSection } from '~/components/ui';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { cn } from '~/utils/shadcn';
import { getAuthToken } from '~/utils/auth-token';
import { Helmet } from 'react-helmet-async';
import { getErrorMessage } from '~/utils/get-error-message';

export function MahasiswaProfilePage() {
	const isAuthenticated = Boolean(getAuthToken());

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
		<HomePageLayout
			isAdmin={false}
			title={`Profil Mahasiswa`}
			isAuthenticatedMahasiswa={isAuthenticated}
		>
			<Helmet>
				<title>{`Kelass | ${`Profil ${data?.nama ?? 'Mahasiswa'}`}`}</title>
			</Helmet>

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
						backToHome
						message={getErrorMessage(error)}
						title="Gagal memuat data mahasiswa"
					/>
				)}

				{(isLoading || !data) && !error && <MahasiswaEditSkeleton />}

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
