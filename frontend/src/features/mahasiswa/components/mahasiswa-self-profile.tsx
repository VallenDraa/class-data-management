import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	Skeleton,
} from '~/components/ui';
import { useGetMahasiswaSelf } from '../api';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useHandleMahasiswaPath } from '../hooks';
import { useHandleLogout } from '~/hooks';
import { useEditMahasiswaSelfTour } from '~/features/docs/hooks';

export function MahasiswaSelfProfile() {
	const { data: mahasiswa, isLoading: isMahasiswaLoading } =
		useGetMahasiswaSelf();

	const { handleLogout } = useHandleLogout();
	const { toMahasiswaSelfPath } = useHandleMahasiswaPath(mahasiswa?.id ?? 0);
	const { openProfileDropdownStep, openProfileStep } =
		useEditMahasiswaSelfTour();

	return (
		<DropdownMenu onOpenChange={openProfileDropdownStep}>
			<DropdownMenuTrigger className="rounded-full">
				{!isMahasiswaLoading && mahasiswa ? (
					<Avatar id="user-profile">
						<AvatarImage src={mahasiswa.foto_profile} alt={mahasiswa.nama} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>
				) : (
					<Skeleton className="w-10 h-10 rounded-full" />
				)}

				<span className="sr-only">Open Profile Popover</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{/* Dialog trigger for user profile detail */}
				<DropdownMenuItem asChild className="gap-1">
					{!isMahasiswaLoading && mahasiswa ? (
						<Link
							onClick={openProfileStep}
							to={toMahasiswaSelfPath()}
							id="profile-dropdown-button"
						>
							<PersonIcon />
							<span>Profil</span>
						</Link>
					) : (
						<Skeleton className="w-full rounded" />
					)}
				</DropdownMenuItem>

				<DropdownMenuItem
					className="gap-1"
					variant="destructive"
					onClick={handleLogout}
				>
					<ExitIcon />
					<span>Keluar</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
