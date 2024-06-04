import { Button } from './button';

export type ErrorMessageSectionProps = {
	title: string;
	message: string;
	refreshPage?: boolean;
};

export function ErrorMessageSection(props: ErrorMessageSectionProps) {
	const { message, title, refreshPage = false } = props;

	return (
		<div className="flex flex-col items-center">
			<h2 className="leading-7">{title}</h2>
			<p className="mb-4 text-sm text-neutral-500">{message}</p>

			{refreshPage && (
				<Button onClick={() => window.location.reload()}>
					Refresh Halaman
				</Button>
			)}
		</div>
	);
}
