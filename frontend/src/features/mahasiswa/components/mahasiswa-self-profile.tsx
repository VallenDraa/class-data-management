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
import { UserIcon, LogOutIcon } from 'lucide-react';
import { MahasiswaProfileDetail } from '.';
import { Link, useLocation } from 'react-router-dom';

export function MahasiswaSelfProfile() {
	const { data: mahasiswa, isLoading: isMahasiswaLoading } =
		useGetMahasiswaSelf();

	const { search } = useLocation();
	const [isDetailOpen, setIsDetailOpen] = React.useState(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{!isMahasiswaLoading && mahasiswa ? (
					<Avatar>
						<AvatarImage src={mahasiswa.foto_profile} alt={mahasiswa.nama} />
						<AvatarFallback>{mahasiswa.nama.slice(0, 2)}</AvatarFallback>
					</Avatar>
				) : (
					<Skeleton className="h-10 w-10 rounded-full" />
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
									<UserIcon size={16} />
									<span>Profil</span>
								</Link>
							) : (
								<Skeleton className="w-full rounded" />
							)}
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem className="gap-1" variant="destructive">
						<LogOutIcon size={16} />
						<span>Keluar</span>
					</DropdownMenuItem>
				</DropdownMenuContent>

				{/* Dialog content for user profile detail */}
				{!isMahasiswaLoading && mahasiswa && (
					<MahasiswaProfileDetail
						isOwnProfile
						isSeenByAdmin={false}
						mahasiswaId={mahasiswa.id}
						isDetailOpen={isDetailOpen}
					/>
				)}
			</Dialog>
		</DropdownMenu>
	);
}
