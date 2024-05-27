import React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '~/components/ui';
import { cn } from '~/utils/shadcn';

export type RedirectLinkProps = {
	to: string;
	children: React.ReactNode;
};

export function RedirectLink(props: RedirectLinkProps) {
	const { to, children } = props;

	return (
		<div className="flex justify-center my-2">
			<Link
				to={to}
				className={cn(
					buttonVariants({ variant: 'link' }),
					'text-sm font-normal',
				)}
			>
				{children}
			</Link>
		</div>
	);
}
