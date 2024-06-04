import { useHandleAdminPath } from '../hooks';
import { HomePageLayout } from '~/components/layouts/home';
import { AdminMahasiswaProfileDetail } from '../components';
import { Link, useParams } from 'react-router-dom';
import { cn } from '~/utils/shadcn';
import { buttonVariants } from '~/components/ui';
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

export function AdminMahasiswaProfilePage() {
	const { toAdminMainPath } = useHandleAdminPath();
	const { mahasiswaId } = useParams();

	const { isOnMahasiswaDeleteTour } = useDeleteMahasiswaTour();
	const { isOnEditAdminMahasiswaTour } = useEditAdminMahasiswaTour();
	const isOnTour = isOnMahasiswaDeleteTour || isOnEditAdminMahasiswaTour;

	return (
		<HomePageLayout
			isAuthenticatedMahasiswa={false}
			isAdmin
			title="Profil Mahasiswa"
		>
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
					<AdminMahasiswaProfileDetail mahasiswaId={Number(mahasiswaId)} />
				)}
			</main>
		</HomePageLayout>
	);
}
