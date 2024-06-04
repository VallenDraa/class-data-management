import { Link } from 'react-router-dom';
import { Button, buttonVariants } from './button';

export type ErrorMessageSectionProps = {
	title: string;
	message: string;
	refreshPage?: boolean;
	backToHome?: boolean;
};

export function ErrorMessageSection(props: ErrorMessageSectionProps) {
	const { message, title, refreshPage = false, backToHome = false } = props;

	return (
		<div className="flex flex-col items-center">
			<h2 className="leading-7">{title}</h2>
			<p className="mb-4 text-sm text-neutral-500">{message}</p>

			{refreshPage && (
				<Button onClick={() => window.location.reload()}>
					Refresh Halaman
				</Button>
			)}

			{backToHome && (
				<Link to="/" className={buttonVariants({ variant: 'default' })}>
					Kembali
				</Link>
			)}
		</div>
	);
}
