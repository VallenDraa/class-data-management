import { Helmet } from 'react-helmet-async';
import { Link, useRouteError } from 'react-router-dom';
import { ErrorPageLayout } from '~/components/layouts';
import { Button, buttonVariants } from '~/components/ui';
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
				<Helmet>
					<title>Kelass | Error 404</title>
				</Helmet>

				<Link
					to="/mahasiswa"
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
			<Helmet>
				<title>Kelass | Halaman Error</title>
			</Helmet>

			<div className="flex flex-col items-center w-full gap-8">
				<span className="text-sm text-neutral-500">
					Pesan untuk admin: <i>{errorMessage}</i>
				</span>

				<Button onClick={() => window.location.reload()}>
					Refresh Halaman
				</Button>
			</div>
		</ErrorPageLayout>
	);
}
