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
import { MahasiswaProfileDetail } from '.';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '~/features/authentication/api';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '~/utils/get-error-message';

export function MahasiswaSelfProfile() {
	const { data: mahasiswa, isLoading: isMahasiswaLoading } =
		useGetMahasiswaSelf();

	const { search } = useLocation();
	const navigate = useNavigate();

	const [isDetailOpen, setIsDetailOpen] = React.useState(false);

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/mahasiswa/login');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				return;
			}

			toast.error(DEFAULT_ERROR_MESSAGE);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{!isMahasiswaLoading && mahasiswa ? (
					<Avatar>
						<AvatarImage src={mahasiswa.foto_profile} alt={mahasiswa.nama} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>
				) : (
					<Skeleton className="w-10 h-10 rounded-full" />
				)}

				<span className="sr-only">Open Profile Popover</span>
			</DropdownMenuTrigger>

			<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
				<DropdownMenuContent align="end">
					{/* Dialog trigger for user profile detail */}
					<DialogTrigger asChild>
						<DropdownMenuItem asChild className="gap-1">
							{!isMahasiswaLoading && mahasiswa ? (
								<Link to={{ pathname: `/mahasiswa/${mahasiswa.id}`, search }}>
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
					<MahasiswaProfileDetail
						detailTitle="Profil Anda"
						isOwnProfile
						mahasiswaId={mahasiswa.id}
						isDetailOpen={isDetailOpen}
						onDetailClose={() => navigate(`/mahasiswa${search}`)}
					/>
				)}
			</Dialog>
		</DropdownMenu>
	);
}
