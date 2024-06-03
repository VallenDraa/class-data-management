import * as React from 'react';
import { VirtualItem } from '@tanstack/react-virtual';

export type VirtualItemWrapperProps = {
	virtualItem: VirtualItem;
	children: React.ReactNode;
};

export function VirtualItemWrapper(props: VirtualItemWrapperProps) {
	const { virtualItem, children } = props;

	return (
		<li
			className="absolute pt-1 inset-x-1"
			style={{
				height: `${virtualItem.size}px`,
				transform: `translateY(${virtualItem.start}px)`,
			}}
		>
			{children}
		</li>
	);
}
