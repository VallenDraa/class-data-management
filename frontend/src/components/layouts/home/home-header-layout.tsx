import * as React from 'react';
import { UserTour } from '~/features/docs/components';
import { ThemeChooser } from '~/components/ui';

export type HomeHeaderLayoutProps = {
	isAdmin: boolean;
	title: string;
	children: React.ReactNode;
};

export function HomeHeaderLayout(props: HomeHeaderLayoutProps) {
	const { children, title } = props;

	return (
		<header className="flex items-center justify-between px-1 py-4 pb-2">
			<h1 className="text-lg font-semibold leading-7">{title}</h1>

			<div className="flex items-center justify-end gap-4">
				<div className="flex items-center">
					<UserTour />
					<ThemeChooser />
				</div>
				{children}
			</div>
		</header>
	);
}
