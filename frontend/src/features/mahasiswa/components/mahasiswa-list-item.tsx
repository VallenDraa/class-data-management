import * as React from 'react';
import { type MahasiswaPreview } from '../types';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Dialog,
	DialogTrigger,
} from '~/components/ui';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';
import { Link } from 'react-router-dom';
import { useHandleMahasiswaPath } from '../hooks';

export type MahasiswaListItemProps = {
	mahasiswa: MahasiswaPreview;
	isOwnProfile: boolean;
};

export function MahasiswaListItem(props: MahasiswaListItemProps) {
	const { mahasiswa, isOwnProfile } = props;

	const [isDetailOpen, setIsDetailOpen] = React.useState(false);
	const { toMahasiswaDetailPath, navigateToMahasiswaMainPath } =
		useHandleMahasiswaPath(mahasiswa.id);

	return (
		<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
			<DialogTrigger asChild>
				<Link
					to={toMahasiswaDetailPath()}
					className="flex items-center w-full gap-4 p-2 transition-colors bg-white border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 dark:hover:bg-sky-800 dark:hover:border-sky-700 hover:border-sky-200 hover:bg-sky-50"
				>
					<Avatar className="w-12 h-12">
						<AvatarImage src={mahasiswa.foto_profile} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col text-start grow">
						<div className="flex items-center justify-between w-full">
							<p className="text-sm text-neutral-500">{mahasiswa.nim}</p>

							{isOwnProfile && <Badge>Anda</Badge>}
						</div>

						<h2 className="font-medium">{mahasiswa.nama}</h2>
					</div>
				</Link>
			</DialogTrigger>

			<MahasiswaProfileDetail
				detailTitle={isOwnProfile ? 'Profil Anda' : `Profil ${mahasiswa.nama}`}
				isOwnProfile={isOwnProfile}
				mahasiswaId={mahasiswa.id}
				isDetailOpen={isDetailOpen}
				onDetailClose={navigateToMahasiswaMainPath}
			/>
		</Dialog>
	);
}
