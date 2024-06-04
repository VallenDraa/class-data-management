import { HomePageLayout } from '~/components/layouts/home';
import { AdminEditForm, AdminEditFormSkeleton } from '../components';
import { useHandleAdminPath } from '../hooks';
import { Link } from 'react-router-dom';
import { buttonVariants, ErrorMessageSection } from '~/components/ui';
import { cn } from '~/utils/shadcn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useGetAdminSelf } from '../api';

export function SelfAdminProfilePage() {
	const { toAdminMainPath } = useHandleAdminPath();
	const { data, error, isLoading } = useGetAdminSelf();

	const handleSubmit = () => {
		//! Not implemented
	};

	return (
		<HomePageLayout isAdmin title="Admin" isAuthenticatedMahasiswa={false}>
			<main className="h-screen">
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

				{error && (
					<ErrorMessageSection
						refreshPage
						message={error.message}
						title="Gagal memuat data admin"
					/>
				)}

				{(isLoading || !data) && !error && <AdminEditFormSkeleton />}

				{data && (
					<AdminEditForm onAdminDataUpdate={handleSubmit} admin={data} />
				)}
			</main>
		</HomePageLayout>
	);
}
