import { type Mahasiswa } from '../types';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Dialog,
	DialogTrigger,
} from '~/components/ui';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';

export type MahasiswaListItemProps = {
	isUserAdmin: boolean;
	mahasiswa: Mahasiswa;
};

export function MahasiswaListItem(props: MahasiswaListItemProps) {
	const { mahasiswa, isUserAdmin } = props;

	return (
		<Dialog>
			<DialogTrigger className="flex items-center w-full gap-4 p-2 rounded-md shadow">
				<Avatar className="w-12 h-12">
					<AvatarImage src={mahasiswa.foto_profile} />
					<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="flex flex-col text-start">
					<p className="text-sm text-neutral-500">{mahasiswa.nim}</p>
					<h2 className="font-medium">{mahasiswa.nama}</h2>
				</div>
			</DialogTrigger>

			<MahasiswaProfileDetail
				user={mahasiswa}
				isOwnProfile={false}
				isSeenByAdmin={isUserAdmin}
			/>
		</Dialog>
	);
}
