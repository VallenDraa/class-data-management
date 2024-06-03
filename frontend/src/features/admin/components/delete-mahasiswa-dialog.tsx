import * as React from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui';
import { useDeleteMahasiswaTour } from '~/features/docs/hooks';

export type DeleteMahasiswaProps = {
	children: React.ReactNode;
	onDelete: () => void;
};

export function DeleteMahasiswaDialog(props: DeleteMahasiswaProps) {
	const { children, onDelete } = props;

	const {
		enableOutsideClickForDeleteDialog,
		forceOpenCreateMahasiswaDialogStep,
	} = useDeleteMahasiswaTour();

	const [isOpen, setOpen] = React.useState(false);

	return (
		<Dialog
			modal={enableOutsideClickForDeleteDialog}
			open={forceOpenCreateMahasiswaDialogStep || isOpen}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Yakin ingin menghapus mahasiswa ini?</DialogTitle>
					<DialogDescription>
						Tindakan ini tidak bisa dibatalkan. Mahasiswa ini akan dihapus
						secara permanen!
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2">
					<Button
						id="cancel-delete-mahasiswa-button"
						variant="secondary"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button
						id="confirm-delete-mahasiswa-button"
						onClick={onDelete}
						variant="destructive"
					>
						Hapus
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
