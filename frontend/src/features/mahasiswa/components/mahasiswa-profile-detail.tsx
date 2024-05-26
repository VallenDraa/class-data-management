import * as React from 'react';
import { MahasiswaUpdate, type Mahasiswa } from '../types';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Button,
} from '~/components/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { MahasiswaEditForm } from './mahasiswa-edit-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMahasiswaValidator } from '../api';

export type MahasiswaProfileDetailProps = {
	user: Mahasiswa;
	isSeenByAdmin: boolean;
	isOwnProfile: boolean;
};

export function MahasiswaProfileDetail(props: MahasiswaProfileDetailProps) {
	const { user, isOwnProfile, isSeenByAdmin } = props;

	const [isEditing, setIsEditing] = React.useState(false);

	const { search } = useLocation();
	const navigate = useNavigate();

	const handleCloseDetail = () => {
		setIsEditing(false);
		navigate(`/mahasiswa${search}`);
	};

	const form = useForm<MahasiswaUpdate>({
		resolver: zodResolver(updateMahasiswaValidator),
		defaultValues: {
			list_kesukaan: user.list_kesukaan,
			alamat: user.alamat,
			nama: user.nama,
			nim: user.nim,
			no_telepon: user.no_telepon,
			tanggal_lahir: user.tanggal_lahir,
		},
	});
	const handleSubmit = (data: MahasiswaUpdate) => {
		console.log(data);
	};
	const handleEditing = () => {
		if (isEditing) {
			setIsEditing(false);
			form.reset();
		} else {
			setIsEditing(true);
		}
	};

	const profileActions = (
		<div className="flex flex-col gap-2 grow">
			{(isSeenByAdmin || isOwnProfile) && (
				<Button
					onClick={handleEditing}
					className="w-full"
					size="sm"
					variant={isEditing ? 'destructive' : 'default'}
				>
					{isEditing ? 'Cancel Edit' : 'Edit Profil'}
				</Button>
			)}

			{isSeenByAdmin && (
				<Button className="w-full" size="sm" variant="ghost-danger">
					Hapus Mahasiswa
				</Button>
			)}

			{isOwnProfile && (
				<Button className="w-full" size="sm" variant="outline">
					Ganti Password
				</Button>
			)}
		</div>
	);

	return (
		<DialogContent
			className="h-screen sm:h-max"
			onClose={handleCloseDetail}
			onEscapeKeyDown={handleCloseDetail}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">Profil anda</DialogTitle>
			</DialogHeader>

			<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
				<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
					<Avatar className="h-auto mx-auto w-28 sm:w-full aspect-square">
						<AvatarImage src={user.foto_profile} />
						<AvatarFallback>{user.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>

					<div className="hidden sm:block">{profileActions}</div>
				</div>

				<MahasiswaEditForm
					form={form}
					onSubmit={handleSubmit}
					isEditing={isEditing}
					user={user}
				/>

				<div className="block sm:hidden">{profileActions}</div>
			</section>
		</DialogContent>
	);
}
