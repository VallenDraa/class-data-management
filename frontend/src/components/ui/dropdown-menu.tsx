import * as React from 'react';
import {
	Root,
	Trigger,
	Group,
	Portal,
	Content,
	Item,
	CheckboxItem,
	ItemIndicator,
	RadioItem,
	Label,
} from '@radix-ui/react-dropdown-menu';
import { CheckIcon, DotFilledIcon } from '@radix-ui/react-icons';

import { cn } from '~/utils/shadcn';
import { cva, VariantProps } from 'class-variance-authority';

const DropdownMenu = Root;

const DropdownMenuTrigger = Trigger;

const DropdownMenuGroup = Group;

const DropdownMenuPortal = Portal;

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof Content>,
	React.ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<Portal>
		<Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				'z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className,
			)}
			{...props}
		/>
	</Portal>
));
DropdownMenuContent.displayName = Content.displayName;

export const dropdownMenuitemVariants = cva(
	'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
	{
		variants: {
			variant: {
				default:
					'focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
				destructive:
					'focus:bg-red-100 focus:text-red-900 dark:focus:bg-red-800 dark:focus:text-red-50',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface DropdownMenuItemProps
	extends React.ComponentPropsWithoutRef<typeof Item>,
		VariantProps<typeof dropdownMenuitemVariants> {
	asChild?: boolean;
	inset?: boolean;
}

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof Item>,
	DropdownMenuItemProps
>(({ className, inset, variant, ...props }, ref) => (
	<Item
		ref={ref}
		className={cn(
			dropdownMenuitemVariants({ variant, className }),
			inset && 'pl-8',
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<CheckboxItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<CheckIcon className="w-4 h-4" />
			</ItemIndicator>
		</span>
		{children}
	</CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof RadioItem>,
	React.ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
	<RadioItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<DotFilledIcon className="w-4 h-4 fill-current" />
			</ItemIndicator>
		</span>
		{children}
	</RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof Label>,
	React.ComponentPropsWithoutRef<typeof Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<Label
		ref={ref}
		className={cn(
			'px-2 py-1.5 text-sm font-semibold',
			inset && 'pl-8',
			className,
		)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = Label.displayName;

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuPortal,
};
