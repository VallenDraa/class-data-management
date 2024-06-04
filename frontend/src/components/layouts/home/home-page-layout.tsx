import * as React from 'react';
import { HomeHeaderLayout, HomeHeaderLayoutProps } from './home-header-layout';

export type PageLayoutProps = HomeHeaderLayoutProps & {
	children: React.ReactNode;
};

export function HomePageLayout(props: PageLayoutProps) {
	const { children, ...rest } = props;

	return (
		<div className="flex flex-col h-screen max-w-xl px-4 mx-auto">
			<HomeHeaderLayout {...rest} />

			{children}

			<div className="flex justify-between my-1.5 text-[0.65rem] text-neutral-500">
				<p>Made By Kelompok 4 With 💖</p>

				<p>2024 | IMK</p>
			</div>
		</div>
	);
}
