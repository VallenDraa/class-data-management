import * as React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	buttonVariants,
} from '~/components/ui';
import { cn } from '~/utils/shadcn';

export type HapusMahasiswaProps = {
	children: React.ReactNode;
	onDelete: () => void;
};

export function HapusMahasiswaDialog(props: HapusMahasiswaProps) {
	const { children, onDelete } = props;

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Yakin ingin menghapus mahasiswa?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak bisa dibatalkan. Mahasiswa ini akan dihapus
						secara permanen!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onDelete}
						className={cn(buttonVariants({ variant: 'destructive' }))}
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
