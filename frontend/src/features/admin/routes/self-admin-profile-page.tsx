import { HomePageLayout } from '~/components/layouts/home';
import { AdminEditForm, AdminEditFormSkeleton } from '../components';
import { useHandleAdminPath } from '../hooks';
import { Link } from 'react-router-dom';
import { buttonVariants, ErrorMessageSection } from '~/components/ui';
import { cn } from '~/utils/shadcn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useGetAdminSelf } from '../api';
import { Helmet } from 'react-helmet-async';
import { getErrorMessage } from '~/utils/get-error-message';

export function SelfAdminProfilePage() {
	const { toAdminMainPath } = useHandleAdminPath();
	const { data, error, isLoading } = useGetAdminSelf();

	const handleSubmit = () => {
		//! Not implemented
	};

	return (
		<HomePageLayout isAdmin title="Admin" isAuthenticatedMahasiswa={false}>
			<Helmet>
				<title>{`Kelass | Profil Anda`}</title>
			</Helmet>

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
						message={getErrorMessage(error)}
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
