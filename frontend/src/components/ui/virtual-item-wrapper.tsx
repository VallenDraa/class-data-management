import * as React from 'react';
import { VirtualItem } from '@tanstack/react-virtual';
import { cn } from '~/utils/shadcn';

export type VirtualItemWrapperProps = React.ComponentPropsWithoutRef<'li'> & {
	virtualItem: VirtualItem;
	children: React.ReactNode;
};

export function VirtualItemWrapper(props: VirtualItemWrapperProps) {
	const { virtualItem, children, className, style, ...rest } = props;

	return (
		<li
			{...rest}
			className={cn('absolute pt-1 inset-x-1', className)}
			style={{
				...style,
				height: `${virtualItem.size}px`,
				transform: `translateY(${virtualItem.start}px)`,
			}}
		>
			{children}
		</li>
	);
}
