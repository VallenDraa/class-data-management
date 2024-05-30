import { Mahasiswa } from '../types';
import { DialogContent, DialogHeader, DialogTitle } from '~/components/ui';
import { MahasiswaEditForm } from './mahasiswa-edit-form';
import {
	useHandleMahasiswaAvatarUpdate,
	useHandleMahasiswaDataUpdate,
	useHandleMahasiswaPasswordUpdate,
} from '../hooks';

export type MahasiswaSelfProfileDetailProps = {
	mahasiswa: Mahasiswa;
	onDetailClose?: () => void;
};

export function MahasiswaSelfProfileDetail(
	props: MahasiswaSelfProfileDetailProps,
) {
	const { mahasiswa, onDetailClose } = props;

	const { handleMahasiswaDataUpdate } = useHandleMahasiswaDataUpdate(
		mahasiswa.id,
	);
	const { handleMahasiswaAvatarUpdate } = useHandleMahasiswaAvatarUpdate(
		mahasiswa.id,
	);
	const { handleMahasiswaPasswordUpdate } = useHandleMahasiswaPasswordUpdate();

	return (
		<DialogContent
			className="h-screen sm:h-max"
			onClose={onDetailClose}
			onEscapeKeyDown={onDetailClose}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">Profil Anda</DialogTitle>
			</DialogHeader>

			<MahasiswaEditForm
				isOwnProfile
				onDataUpdate={handleMahasiswaDataUpdate}
				onAvatarUpdate={handleMahasiswaAvatarUpdate}
				onPasswordUpdate={handleMahasiswaPasswordUpdate}
				mahasiswa={mahasiswa}
			/>
		</DialogContent>
	);
}
