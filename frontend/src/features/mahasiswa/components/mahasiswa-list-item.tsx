import * as React from 'react';
import { type Mahasiswa } from '../types';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Dialog,
	DialogTrigger,
} from '~/components/ui';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';
import { Link, useLocation } from 'react-router-dom';

export type MahasiswaListItemProps = {
	isUserAdmin: boolean;
	mahasiswa: Mahasiswa;
};

export function MahasiswaListItem(props: MahasiswaListItemProps) {
	const { mahasiswa, isUserAdmin } = props;

	const isOwnProfile = Number(mahasiswa.id) === 1;

	const { search } = useLocation();
	const [isDetailOpen, setIsDetailOpen] = React.useState(false);

	return (
		<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
			<DialogTrigger asChild>
				<Link
					to={{ pathname: `/mahasiswa/${mahasiswa.id}`, search }}
					className="flex items-center w-full gap-4 p-2 rounded-md shadow-sm border border-neutral-200 hover:border-sky-200 hover:bg-sky-50 transition-colors"
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
				//! The isOwnProfle prop is a hardcoded placeholder
				isOwnProfile={isOwnProfile}
				mahasiswaId={mahasiswa.id}
				isDetailOpen={isDetailOpen}
				isSeenByAdmin={isUserAdmin}
			/>
		</Dialog>
	);
}
