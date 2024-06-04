import { AuthPageLayout } from '~/components/layouts';
import { AdminLogin } from '../components';
import { Helmet } from 'react-helmet-async';

export function AdminLoginPage() {
	return (
		<AuthPageLayout>
			<Helmet>
				<title>Kelass | Halaman Login Admin</title>
			</Helmet>

			<AdminLogin />
		</AuthPageLayout>
	);
}
