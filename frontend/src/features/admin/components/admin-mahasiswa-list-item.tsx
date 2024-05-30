import { type MahasiswaPreview } from '~/features/mahasiswa/types';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Dialog,
	DialogTrigger,
} from '~/components/ui';
import { Link } from 'react-router-dom';
import { AdminMahasiswaProfileDetail } from './admin-mahasiswa-profile-detail';
import { useHandleAdminMahasiswaPath, useHandleAdminPath } from '../hooks';
import { useAdminMahasiswaDetailDialogStatus } from '../providers';

export type AdminMahasiswaListItemProps = {
	mahasiswa: MahasiswaPreview;
};

export function AdminMahasiswaListItem(props: AdminMahasiswaListItemProps) {
	const { mahasiswa } = props;

	const { isOpen, setIsOpen } = useAdminMahasiswaDetailDialogStatus();

	const { navigateToAdminMainPath } = useHandleAdminPath();
	const { toAdminMahasiswaDetailPath } = useHandleAdminMahasiswaPath(
		mahasiswa.id,
	);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Link
					to={toAdminMahasiswaDetailPath}
					className="flex items-center w-full gap-4 p-2 transition-colors bg-white border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 dark:hover:bg-sky-800 dark:hover:border-sky-700 hover:border-sky-200 hover:bg-sky-50"
				>
					<Avatar className="w-12 h-12">
						<AvatarImage src={mahasiswa.foto_profile} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col text-start grow">
						<p className="text-sm text-neutral-500 dark:text-neutral-400">
							{mahasiswa.nim}
						</p>
						<h2 className="font-medium">{mahasiswa.nama}</h2>
					</div>
				</Link>
			</DialogTrigger>

			<AdminMahasiswaProfileDetail
				isDetailOpen={isOpen}
				detailTitle={`Profil ${mahasiswa.nama}`}
				mahasiswaId={mahasiswa.id}
				onDetailClose={navigateToAdminMainPath}
			/>
		</Dialog>
	);
}
