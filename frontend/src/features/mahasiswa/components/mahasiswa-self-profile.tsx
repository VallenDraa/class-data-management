import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	Skeleton,
	AvatarWithSkeleton,
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
				<AvatarWithSkeleton
					isLoading={isMahasiswaLoading || !mahasiswa}
					src={mahasiswa?.foto_profile ?? ''}
					alt={mahasiswa?.nama ?? ''}
					fallback={mahasiswa?.nama.slice(0, 2) ?? ''}
				/>

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
