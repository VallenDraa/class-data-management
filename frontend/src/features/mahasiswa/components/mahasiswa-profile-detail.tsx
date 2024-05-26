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
	isDetailOpen: boolean;
	mahasiswaId: number;
	isSeenByAdmin: boolean;
	isOwnProfile: boolean;
};

export function MahasiswaProfileDetail(props: MahasiswaProfileDetailProps) {
	const { isDetailOpen, mahasiswaId, isOwnProfile, isSeenByAdmin } = props;

	const { search } = useLocation();
	const navigate = useNavigate();

	const { data: mahasiswa, isLoading: isMahasiswaLoading } =
		useGetSingleMahasiswa({ id: Number(mahasiswaId), enabled: isDetailOpen });

	const handleCloseDetail = () => {
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
				<DialogTitle className="mb-5">Profil anda</DialogTitle>
			</DialogHeader>

			{isDetailOpen && !isMahasiswaLoading && mahasiswa ? (
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
			)}
		</DialogContent>
	);
}
