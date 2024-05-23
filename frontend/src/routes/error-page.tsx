import { Link, useRouteError } from 'react-router-dom';
import { ErrorPageLayout } from '~/components/layouts';
import { buttonVariants } from '~/components/ui';
import { getErrorMessage } from '~/utils/get-error-message';

const ROUTER_ERRORS = {
	NOT_FOUND: 'Not Found',
};

export function ErrorPage() {
	const error = useRouteError();
	const errorMessage = getErrorMessage(error);

	if (errorMessage === ROUTER_ERRORS.NOT_FOUND) {
		return (
			<ErrorPageLayout
				title="Error 404!"
				message="Halaman yang anda cari tidak bisa ditemukan."
			>
				<Link
					to="/home"
					className={buttonVariants({
						variant: 'link',
					})}
				>
					&larr; Kembali
				</Link>
			</ErrorPageLayout>
		);
	}

	return (
		<ErrorPageLayout
			title="Oops!"
			message="Ada error yang terjadi. Silahkan refresh halaman atau coba lagi nanti."
		>
			<span className="text-sm font-medium text-neutral-500">
				Pesan: <i>{errorMessage}</i>{' '}
			</span>
		</ErrorPageLayout>
	);
}
