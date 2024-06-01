import * as React from 'react';

export type PageLayoutProps = {
	children: React.ReactNode;
};

export function HomePageLayout(props: PageLayoutProps) {
	return (
		<div className="flex flex-col h-screen max-w-xl px-4 mx-auto">
			{props.children}

			<div className="flex justify-between my-1.5 text-[0.65rem] text-neutral-500">
				<p>Dibuat oleh kelompok 4</p>

				<p>2024 | IMK</p>
			</div>
		</div>
	);
}
