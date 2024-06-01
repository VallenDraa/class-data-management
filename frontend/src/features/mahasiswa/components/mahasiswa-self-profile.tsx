import * as React from 'react';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	Dialog,
	Skeleton,
} from '~/components/ui';
import { useGetMahasiswaSelf } from '../api';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { MahasiswaSelfProfileDetail } from '.';
import { Link } from 'react-router-dom';
import { useHandleMahasiswaPath } from '../hooks';
import { useHandleLogout } from '~/hooks';
import { useEditMahasiswaSelfTour } from '~/features/docs/hooks';

export function MahasiswaSelfProfile() {
	const [isDetailOpen, setIsDetailOpen] = React.useState(false);
	const { data: mahasiswa, isLoading: isMahasiswaLoading } =
		useGetMahasiswaSelf();

	const { handleLogout } = useHandleLogout();
	const { navigateToMahasiswaMainPath, toMahasiswaDetailPath } =
		useHandleMahasiswaPath(mahasiswa?.id ?? 0);

	const { profileDialogAlwaysOn, openProfileDropdownStep, openProfileStep } =
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

			<Dialog
				onOpenChange={setIsDetailOpen}
				open={profileDialogAlwaysOn || isDetailOpen}
			>
				<DropdownMenuContent align="end">
					{/* Dialog trigger for user profile detail */}
					<DialogTrigger asChild>
						<DropdownMenuItem asChild className="gap-1">
							{!isMahasiswaLoading && mahasiswa ? (
								<Link
									onClick={openProfileStep}
									to={toMahasiswaDetailPath()}
									id="profile-dropdown-button"
								>
									<PersonIcon />
									<span>Profil</span>
								</Link>
							) : (
								<Skeleton className="w-full rounded" />
							)}
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem
						className="gap-1"
						variant="destructive"
						onClick={handleLogout}
					>
						<ExitIcon />
						<span>Keluar</span>
					</DropdownMenuItem>
				</DropdownMenuContent>

				{/* Dialog content for user profile detail */}
				{!isMahasiswaLoading && mahasiswa && (
					<MahasiswaSelfProfileDetail
						mahasiswa={mahasiswa}
						onDetailClose={navigateToMahasiswaMainPath}
					/>
				)}
			</Dialog>
		</DropdownMenu>
	);
}
