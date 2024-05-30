import { Button } from './button';

export type DialogErrorMessageProps = {
	title: string;
	message: string;
	refreshPage?: boolean;
};

export function DialogErrorMessage(props: DialogErrorMessageProps) {
	const { message, title, refreshPage = false } = props;

	return (
		<div className="flex flex-col items-center mt-6">
			<h2 className="leading-7">{title}</h2>
			<p className="text-sm text-neutral-500">{message}</p>

			{refreshPage && (
				<Button onClick={() => window.location.reload()}>
					Refresh Halaman
				</Button>
			)}
		</div>
	);
}
