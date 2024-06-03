import { type Mahasiswa, type MahasiswaUpdate } from '../types';
import {
	Button,
	Skeleton,
	Avatar,
	AvatarImage,
	AvatarFallback,
	UserEditableAvatar,
} from '~/components/ui';
import { ChangePassword, ChangePasswordDialog } from './change-password-dialog';
import { useMahasiswaUpdateForm } from '../hooks';
import { MahasiswaFormFields } from './mahasiswa-form-fields';

export type MahasiswaEditSkeletonProps = {
	isOwnProfile?: boolean;
};

export function MahasiswaEditSkeleton(props: MahasiswaEditSkeletonProps) {
	return (
		<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
			<div className="flex flex-row items-center w-full gap-4 sm:w-32 sm:flex-col">
				<Skeleton className="h-auto mx-auto rounded-full w-28 aspect-square" />

				{props.isOwnProfile && (
					<div className="hidden w-full space-y-2 sm:block">
						<Skeleton className="w-full h-8 rounded-md" />
						<Skeleton className="w-full h-8 rounded-md" />
					</div>
				)}
			</div>

			<Skeleton className="w-full h-96" />
		</div>
	);
}

export type MahasiswaEditFormProps = {
	onAvatarUpdate: (base64Str: string | null) => void | Promise<void>;
	onPasswordUpdate: (password: ChangePassword) => void | Promise<void>;
	onDataUpdate: (data: MahasiswaUpdate) => void | Promise<void>;
	mahasiswa: Mahasiswa;
	isOwnProfile: boolean;
};

export function MahasiswaEditForm(props: MahasiswaEditFormProps) {
	const {
		mahasiswa,
		onAvatarUpdate,
		onDataUpdate,
		onPasswordUpdate,
		isOwnProfile,
	} = props;

	const {
		mahasiswaForm,
		handleEditing,
		handleOnDataUpdate,
		isEditing,
		isEditingImage,
		setIsEditingImage,
	} = useMahasiswaUpdateForm(mahasiswa, onDataUpdate);

	return (
		<section className="flex flex-col h-1 gap-2 overflow-auto sm:gap-4 sm:flex-row animate-in grow">
			<div className="flex flex-col items-center justify-center w-full gap-4 sm:w-32 sm:justify-start">
				{isOwnProfile ? (
					<div id="change-avatar">
						<UserEditableAvatar
							isEditing={isEditingImage}
							setIsEditing={setIsEditingImage}
							onSubmit={onAvatarUpdate}
							imageSrc={mahasiswa.foto_profile}
							alt={mahasiswa.nama.slice(0, 2)}
							className="h-auto mx-auto w-28 aspect-square"
						/>
					</div>
				) : (
					<Avatar id="change-avatar" className="h-auto w-28 aspect-square">
						<AvatarImage src={mahasiswa.foto_profile} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>
				)}

				{!isEditingImage && (
					<div className="flex flex-col w-full gap-2 grow">
						{isOwnProfile && (
							<Button
								id="edit-profile"
								size="sm"
								className="w-full"
								onClick={handleEditing}
								variant={isEditing ? 'destructive' : 'default'}
								disabled={mahasiswaForm.formState.isSubmitting}
							>
								{isEditing ? 'Cancel Edit' : 'Edit Profil'}
							</Button>
						)}

						{isOwnProfile && (
							<ChangePasswordDialog onSubmit={onPasswordUpdate}>
								<Button
									id="change-password"
									size="sm"
									variant="outline"
									className="w-full"
									disabled={mahasiswaForm.formState.isSubmitting || isEditing}
								>
									Ganti Password
								</Button>
							</ChangePasswordDialog>
						)}
					</div>
				)}
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
