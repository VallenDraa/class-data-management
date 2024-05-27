import * as React from 'react';
import { type Mahasiswa } from '~/features/mahasiswa/types';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Dialog,
	DialogTrigger,
} from '~/components/ui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AdminMahasiswaProfileDetail } from './admin-mahasiswa-profile-detail';

export const AdminMahasiswaDetailDialogStatus = React.createContext<{
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>({
	isOpen: false,
	setIsOpen: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminMahasiswaDetailDialogStatus = () =>
	React.useContext(AdminMahasiswaDetailDialogStatus);

export type AdminMahasiswaListItemProps = {
	mahasiswa: Mahasiswa;
};

export function AdminMahasiswaListItem(props: AdminMahasiswaListItemProps) {
	const { mahasiswa } = props;

	const { search } = useLocation();
	const navigate = useNavigate();

	const [isDetailOpen, setIsDetailOpen] = React.useState(false);

	const adminMahasiswaDetailDialogStatusValue = React.useMemo(
		() => ({
			isOpen: isDetailOpen,
			setIsOpen: setIsDetailOpen,
		}),
		[isDetailOpen],
	);

	return (
		<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
			<DialogTrigger asChild>
				<Link
					to={{
						pathname: `/admin/mahasiswa/${mahasiswa.id}`,
						search,
					}}
					className="flex items-center w-full gap-4 p-2 rounded-md shadow-sm border border-neutral-200 hover:border-sky-200 hover:bg-sky-50 transition-colors"
				>
					<Avatar className="w-12 h-12">
						<AvatarImage src={mahasiswa.foto_profile} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col text-start grow">
						<p className="text-sm text-neutral-500">{mahasiswa.nim}</p>
						<h2 className="font-medium">{mahasiswa.nama}</h2>
					</div>
				</Link>
			</DialogTrigger>

			<AdminMahasiswaDetailDialogStatus.Provider
				value={adminMahasiswaDetailDialogStatusValue}
			>
				<AdminMahasiswaProfileDetail
					isDetailOpen={isDetailOpen}
					detailTitle={`Profil ${mahasiswa.nama}`}
					mahasiswaId={mahasiswa.id}
					onDetailClose={() => navigate(`/admin${search}`)}
				/>
			</AdminMahasiswaDetailDialogStatus.Provider>
		</Dialog>
	);
}
