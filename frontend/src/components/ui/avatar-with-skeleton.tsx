import React from 'react';
import { Skeleton } from './skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export type AvatarWithSkeletonProps = {
	isLoading: boolean;
	src: string;
	alt: string;
	fallback: string;
};

export const AvatarWithSkeleton = React.memo(
	(props: AvatarWithSkeletonProps) => {
		const { isLoading, src, alt, fallback } = props;

		return isLoading ? (
			<Skeleton className="w-10 h-10 rounded-full" />
		) : (
			<Avatar id="user-profile">
				<AvatarImage src={src} alt={alt} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
		);
	},
	(prev, curr) => {
		return (
			prev.isLoading === curr.isLoading &&
			prev.src === curr.src &&
			prev.alt === curr.alt &&
			prev.fallback === curr.fallback
		);
	},
);
