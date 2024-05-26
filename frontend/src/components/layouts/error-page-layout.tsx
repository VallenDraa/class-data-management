import * as React from 'react';

export type ErrorPageLayoutProps = {
	title: string;
	message: string;
	children: React.ReactNode;
};

export function ErrorPageLayout(props: ErrorPageLayoutProps) {
	const { title, message, children } = props;

	return (
		<div className="flex flex-col items-center justify-center h-screen max-w-xl mx-auto">
			<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
			<p className="mb-2">{message}</p>

			{children}
		</div>
	);
}
