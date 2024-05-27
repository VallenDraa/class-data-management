import { AuthPageLayout } from '~/components/layouts';
import { AdminLogin } from '../components';

export function AdminLoginPage() {
	return (
		<AuthPageLayout>
			<AdminLogin />
		</AuthPageLayout>
	);
}
