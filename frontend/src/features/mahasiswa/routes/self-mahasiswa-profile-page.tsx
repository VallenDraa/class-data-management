import { Link } from 'react-router-dom';
import { useGetMahasiswaSelf } from '../api';
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

export function SelfMahasiswaProfilePage() {
	const isAuthenticated = Boolean(getAuthToken());
	const { data, error, isLoading } = useGetMahasiswaSelf({
		enabled: isAuthenticated,
	});

	const { toMahasiswaMainPath } = useHandleMahasiswaPath(data?.id ?? 0);

	const { handleMahasiswaDataUpdate } = useHandleMahasiswaDataUpdate(
		data?.id ?? 0,
	);
	const { handleMahasiswaAvatarUpdate } = useHandleMahasiswaAvatarUpdate(
		data?.id ?? 0,
	);
	const { handleMahasiswaPasswordUpdate } = useHandleMahasiswaPasswordUpdate();

	return (
		<HomePageLayout
			isAuthenticatedMahasiswa={isAuthenticated}
			isAdmin={false}
			title="Profil Anda"
		>
			<Helmet>
				<title>Kelass | Profil Anda</title>
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
						refreshPage
						message={getErrorMessage(error)}
						title="Gagal memuat data profile anda"
					/>
				)}

				{(isLoading || !data) && !error && <MahasiswaEditSkeleton />}

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
