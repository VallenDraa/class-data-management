import {
	DialogContent,
	DialogErrorMessage,
	DialogHeader,
	DialogTitle,
	Skeleton,
} from '~/components/ui';
import { MahasiswaEditForm } from './mahasiswa-edit-form';
import { useGetSingleMahasiswa } from '../api/get-single-mahasiswa';
import {
	useHandleMahasiswaAvatarUpdate,
	useHandleMahasiswaDataUpdate,
	useHandleMahasiswaPasswordUpdate,
} from '../hooks';

export function MahasiswaProfileDetailSkeleton() {
	return (
		<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
			<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
				<Skeleton className="h-auto mx-auto rounded-full w-28 sm:w-full aspect-square" />

				<div className="hidden w-full space-y-2 sm:block">
					<Skeleton className="w-full h-8 rounded-md" />
					<Skeleton className="w-full h-8 rounded-md" />
				</div>
			</div>

			<Skeleton className="w-full h-96" />
		</div>
	);
}

export type MahasiswaProfileDetailProps = {
	detailTitle?: string;
	isDetailOpen: boolean;
	mahasiswaId: number;
	isOwnProfile: boolean;
	onDetailClose?: () => void;
};

export function MahasiswaProfileDetail(props: MahasiswaProfileDetailProps) {
	const {
		detailTitle,
		isDetailOpen,
		mahasiswaId,
		isOwnProfile,
		onDetailClose,
	} = props;

	const {
		data: mahasiswa,
		isLoading: isMahasiswaLoading,
		error,
	} = useGetSingleMahasiswa({ id: mahasiswaId, enabled: isDetailOpen });

	const { handleMahasiswaDataUpdate } =
		useHandleMahasiswaDataUpdate(mahasiswaId);
	const { handleMahasiswaAvatarUpdate } =
		useHandleMahasiswaAvatarUpdate(mahasiswaId);
	const { handleMahasiswaPasswordUpdate } = useHandleMahasiswaPasswordUpdate();

	return (
		<DialogContent
			className="h-screen sm:h-max"
			onClose={onDetailClose}
			onEscapeKeyDown={onDetailClose}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">
					{detailTitle || (
						<>
							{!mahasiswa && isMahasiswaLoading ? (
								<Skeleton className="w-1/3 h-8" />
							) : (
								`Profil ${mahasiswa?.nama ?? 'Mahasiswa'}`
							)}
						</>
					)}
				</DialogTitle>
			</DialogHeader>

			{!error ? (
				isDetailOpen && !isMahasiswaLoading && mahasiswa ? (
					<MahasiswaEditForm
						isOwnProfile={isOwnProfile}
						onPasswordUpdate={handleMahasiswaPasswordUpdate}
						onAvatarUpdate={handleMahasiswaAvatarUpdate}
						onDataUpdate={handleMahasiswaDataUpdate}
						mahasiswa={mahasiswa}
					/>
				) : (
					<MahasiswaProfileDetailSkeleton />
				)
			) : (
				<DialogErrorMessage
					refreshPage
					message={error.message}
					title="Gagal memuat data mahasiswa"
				/>
			)}
		</DialogContent>
	);
}
