import { AuthPageLayout } from '~/components/layouts';
import { MahasiswaLogin } from '../components';
import { Helmet } from 'react-helmet-async';

export function MahasiswaLoginPage() {
	return (
		<AuthPageLayout>
			<Helmet>
				<title>Kelass | Halaman Login Mahasiswa</title>
			</Helmet>

			<MahasiswaLogin />
		</AuthPageLayout>
	);
}
