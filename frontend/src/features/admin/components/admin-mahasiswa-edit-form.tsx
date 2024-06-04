import {
	type Mahasiswa,
	type MahasiswaUpdate,
} from '~/features/mahasiswa/types';
import {
	Button,
	Skeleton,
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '~/components/ui';
import { DeleteMahasiswaDialog } from './delete-mahasiswa-dialog';
import { useMahasiswaUpdateForm } from '~/features/mahasiswa/hooks';
import { MahasiswaFormFields } from '~/features/mahasiswa/components';
import {
	useDeleteMahasiswaTour,
	useEditAdminMahasiswaTour,
} from '~/features/docs/hooks';

export function AdminMahasiswaEditFormSkeleton() {
	return (
		<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
			<div className="flex flex-row items-center w-full gap-4 sm:w-32 sm:flex-col">
				<Skeleton className="h-auto mx-auto rounded-full w-28 aspect-square" />

				<div className="hidden w-full space-y-2 sm:block">
					<Skeleton className="w-full h-8 rounded-md" />
					<Skeleton className="w-full h-8 rounded-md" />
				</div>
			</div>

			<Skeleton className="w-full h-96" />
		</div>
	);
}

export type AdminMahasiswaEditFormProps = {
	isDeleting: boolean;
	onMahasiswaDelete: () => void | Promise<void>;
	onDataUpdate: (data: MahasiswaUpdate) => void | Promise<void>;
	mahasiswa: Mahasiswa;
};

export function AdminMahasiswaEditForm(props: AdminMahasiswaEditFormProps) {
	const { mahasiswa, onDataUpdate, isDeleting, onMahasiswaDelete } = props;

	const { handleEditing, handleOnDataUpdate, isEditing, mahasiswaForm } =
		useMahasiswaUpdateForm(mahasiswa, onDataUpdate);

	const { isOnMahasiswaDeleteTour, openDeleteConfirmationDialogDeleteStep } =
		useDeleteMahasiswaTour();
	const { isOnEditAdminMahasiswaTour, openMahasiswaDetailProfileEditStep } =
		useEditAdminMahasiswaTour();

	return (
		<section className="flex flex-col h-full gap-2 sm:gap-4 sm:flex-row">
			<div className="flex flex-col items-center justify-center w-full gap-4 sm:w-32 sm:justify-start">
				<Avatar id="change-avatar" className="h-auto w-28 aspect-square">
					<AvatarImage src={mahasiswa.foto_profile} />
					<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="flex flex-row-reverse w-full gap-2 sm:flex-col">
					<Button
						id="edit-profile"
						size="sm"
						className="w-full"
						disabled={isDeleting || mahasiswaForm.formState.isSubmitting}
						onClick={() => {
							if (isOnEditAdminMahasiswaTour) {
								openMahasiswaDetailProfileEditStep();
							} else {
								handleEditing();
							}
						}}
						variant={isEditing ? 'destructive' : 'default'}
					>
						{isEditing ? 'Cancel Edit' : 'Edit Profil'}
					</Button>

					<DeleteMahasiswaDialog onDelete={onMahasiswaDelete}>
						<Button
							onClick={() => {
								if (isOnMahasiswaDeleteTour) {
									openDeleteConfirmationDialogDeleteStep();
								}
							}}
							id="delete-mahasiswa-button"
							disabled={
								isDeleting || mahasiswaForm.formState.isSubmitting || isEditing
							}
							className="w-full"
							size="sm"
							variant="ghost-danger"
						>
							Hapus Mahasiswa
						</Button>
					</DeleteMahasiswaDialog>
				</div>
			</div>

			<MahasiswaFormFields
				form={mahasiswaForm}
				isEditing={isEditing}
				mahasiswa={mahasiswa}
				handleOnDataUpdate={handleOnDataUpdate}
			/>
		</section>
	);
}
