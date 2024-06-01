import { useHandleAdminPath } from '../hooks';
import { HomeHeaderLayout, HomePageLayout } from '~/components/layouts/home';
import { AdminSelfProfile } from '../components';
import { Link, useParams } from 'react-router-dom';
import { cn } from '~/utils/shadcn';
import { buttonVariants } from '~/components/ui';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { AdminMahasiswaProfileDetail } from '../components/admin-mahasiswa-profile-detail';

export function AdminMahasiswaProfilePage() {
	const { toAdminMainPath } = useHandleAdminPath();
	const { mahasiswaId } = useParams();

	return (
		<HomePageLayout>
			<HomeHeaderLayout isAdmin title="Profil Mahasiswa">
				<AdminSelfProfile />
			</HomeHeaderLayout>

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

				<AdminMahasiswaProfileDetail mahasiswaId={Number(mahasiswaId)} />
			</main>
		</HomePageLayout>
	);
}
