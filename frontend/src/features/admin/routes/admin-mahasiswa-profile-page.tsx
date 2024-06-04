import { useHandleAdminPath } from '../hooks';
import { HomePageLayout } from '~/components/layouts/home';
import {
	AdminMahasiswaEditFormSkeleton,
	AdminMahasiswaProfileDetail,
} from '../components';
import { Link, useParams } from 'react-router-dom';
import { cn } from '~/utils/shadcn';
import { buttonVariants, ErrorMessageSection } from '~/components/ui';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import {
	useDeleteMahasiswaTour,
	useEditAdminMahasiswaTour,
} from '~/features/docs/hooks';
import { TourAdminMahasiswaProfileDetail } from '~/features/docs/components/tour-placeholders';
import {
	MAHASISWA_HISTORY_LIST_PLACEHOLDER,
	MAHASISWA_PLACEHOLDER,
	VOID_FN,
} from '~/constants/placeholders';
import { useGetSingleMahasiswa } from '~/features/mahasiswa/api';
import { getErrorMessage } from '~/utils/get-error-message';
import { Helmet } from 'react-helmet-async';

export function AdminMahasiswaProfilePage() {
	const { toAdminMainPath } = useHandleAdminPath();
	const { mahasiswaId } = useParams();

	const { isOnMahasiswaDeleteTour } = useDeleteMahasiswaTour();
	const { isOnEditAdminMahasiswaTour } = useEditAdminMahasiswaTour();
	const isOnTour = isOnMahasiswaDeleteTour || isOnEditAdminMahasiswaTour;

	const { data, isLoading, error } = useGetSingleMahasiswa({
		id: Number(mahasiswaId),
	});

	return (
		<HomePageLayout
			isAuthenticatedMahasiswa={false}
			isAdmin
			title="Profil Mahasiswa"
		>
			<Helmet>
				<title>{`Kelass | ${`Profil ${data?.nama ?? 'Mahasiswa'}`}`}</title>
			</Helmet>

			<main className="flex flex-col h-screen">
				<Link
					to={toAdminMainPath()}
					className={cn(
						buttonVariants({ variant: 'link' }),
						'self-start gap-1',
					)}
				>
					<ArrowLeftIcon />
					<span>Kembali</span>
				</Link>

				{isOnTour ? (
					<TourAdminMahasiswaProfileDetail
						activeTab="profil"
						mahasiswa={MAHASISWA_PLACEHOLDER}
						setActiveTab={VOID_FN}
						historyItems={MAHASISWA_HISTORY_LIST_PLACEHOLDER}
					/>
				) : (
					<>
						{error && (
							<ErrorMessageSection
								backToHome
								message={getErrorMessage(error)}
								title="Gagal mengambil data mahasiswa"
							/>
						)}

						{isLoading && !data && !error && <AdminMahasiswaEditFormSkeleton />}
						{data && <AdminMahasiswaProfileDetail mahasiswa={data} />}
					</>
				)}
			</main>
		</HomePageLayout>
	);
}
