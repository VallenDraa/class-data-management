import { MahasiswaTour } from '~/features/docs/components/tour';
import { buttonVariants, ThemeChooser } from '~/components/ui';
import { AdminTour } from '~/features/docs/components/tour/admin-tour';
import { AdminSelfProfile } from '~/features/admin/components';
import { MahasiswaSelfProfile } from '~/features/mahasiswa/components';
import { Link } from 'react-router-dom';

export type HomeHeaderLayoutProps = {
	isAuthenticatedMahasiswa: boolean;
	isAdmin: boolean;
	title: string;
};

export function HomeHeaderLayout(props: HomeHeaderLayoutProps) {
	const { isAuthenticatedMahasiswa, isAdmin, title } = props;

	return (
		<header className="flex items-center justify-between px-1 py-4 pb-2">
			<h1 className="text-lg font-semibold leading-7">{title}</h1>

			<div className="flex items-center justify-end gap-4">
				<div className="flex items-center">
					{isAdmin ? <AdminTour /> : <MahasiswaTour />}
					<ThemeChooser />
				</div>
				{isAdmin && <AdminSelfProfile />}

				{isAuthenticatedMahasiswa && !isAdmin && <MahasiswaSelfProfile />}
				{!isAuthenticatedMahasiswa && !isAdmin && (
					<Link
						to="/mahasiswa/login"
						className={buttonVariants({ variant: 'default' })}
					>
						Login
					</Link>
				)}
			</div>
		</header>
	);
}
