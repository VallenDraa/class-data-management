import * as React from 'react';

export type ErrorPageLayoutProps = {
	title: string;
	message: string;
	children: React.ReactNode;
};

export function ErrorPageLayout(props: ErrorPageLayoutProps) {
	const { title, message, children } = props;

	return (
		<div className="flex flex-col items-center justify-center h-screen max-w-xl px-4 mx-auto">
			<h2 className="mb-2 text-2xl font-semibold leading-7">{title}</h2>
			<p className="mb-1 text-sm font-medium text-neutral-500">{message}</p>

			{children}
		</div>
	);
}
