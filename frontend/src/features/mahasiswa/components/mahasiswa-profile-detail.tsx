import { type MahasiswaUpdate } from '../types';
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	Skeleton,
} from '~/components/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { MahasiswaEditForm } from './mahasiswa-edit-form';
import { useGetSingleMahasiswa } from '../api/get-single-mahasiswa';

export type MahasiswaProfileDetailProps = {
	detailTitle?: string;
	isDetailOpen: boolean;
	mahasiswaId: number;
	isSeenByAdmin: boolean;
	isOwnProfile: boolean;
	onDetailClose?: () => void;
};

export function MahasiswaProfileDetail(props: MahasiswaProfileDetailProps) {
	const {
		detailTitle,
		isDetailOpen,
		mahasiswaId,
		isOwnProfile,
		isSeenByAdmin,
		onDetailClose,
	} = props;

	const { search } = useLocation();
	const navigate = useNavigate();

	const {
		data: mahasiswa,
		isLoading: isMahasiswaLoading,
		error,
	} = useGetSingleMahasiswa({ id: Number(mahasiswaId), enabled: isDetailOpen });

	const handleCloseDetail = () => {
		onDetailClose?.();
		navigate(`/mahasiswa${search}`);
	};

	const handleSubmit = (data: MahasiswaUpdate) => {
		console.log(data);
	};

	return (
		<DialogContent
			className="h-screen sm:h-max"
			onClose={handleCloseDetail}
			onEscapeKeyDown={handleCloseDetail}
		>
			<DialogHeader>
				<DialogTitle className="mb-5">
					{detailTitle || (
						<>
							{!mahasiswa && isMahasiswaLoading ? (
								<Skeleton className="h-8 w-1/3" />
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
						isSeenByAdmin={isSeenByAdmin}
						onSubmit={handleSubmit}
						user={mahasiswa}
					/>
				) : (
					<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
						<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
							<Skeleton className="h-auto mx-auto w-28 sm:w-full aspect-square rounded-full" />

							<div className="space-y-2 w-full">
								<Skeleton className="h-8 w-full rounded-md" />
								<Skeleton className="h-8 w-full rounded-md" />
							</div>
						</div>

						<Skeleton className="w-full h-96" />
					</section>
				)
			) : (
				<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
					<p>{error.message}</p>
				</section>
			)}
		</DialogContent>
	);
}
