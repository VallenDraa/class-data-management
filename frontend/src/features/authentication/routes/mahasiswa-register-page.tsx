import { AuthPageLayout } from '~/components/layouts';
import { MahasiswaRegister } from '../components';
import { Helmet } from 'react-helmet-async';

export function MahasiswaRegisterPage() {
	return (
		<AuthPageLayout>
			<Helmet>
				<title>Kelass | Halaman Register Mahasiswa</title>
			</Helmet>

			<MahasiswaRegister />
		</AuthPageLayout>
	);
}
