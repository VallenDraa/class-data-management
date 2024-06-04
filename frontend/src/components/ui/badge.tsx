import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/shadcn';

const badgeVariants = cva(
	'rounded-full py-0.5 px-3 text-xs font-medium border',
	{
		variants: {
			variant: {
				default:
					'border-sky-200 dark:border-sky-700 bg-sky-100 dark:bg-sky-600 text-sky-500 dark:text-sky-100',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
