import { type Mahasiswa } from '../types';
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
} from '~/components/ui';
import { UserIcon, LogOutIcon } from 'lucide-react';
import { MahasiswaProfileDetail } from '.';
import { Link, useLocation } from 'react-router-dom';

export function UserProfile() {
	const user: Mahasiswa = {
		id: 1,
		foto_profile: 'https://github.com/shadcn.png',
		nama: 'Tjan Coe Oek',
		list_kesukaan: ['Berdagang', 'Judi', 'Minum Kopi'],
		nim: '11220910000273',
		tanggal_lahir: '1979-10-10',
		no_telepon: '0817823909122',
		alamat: {
			alamat: 'Jl. Gang Glodok No.21 RT 01 RW 01',
			latitude: '-6.200000',
			longitude: '106.816666',
		},
	};

	const { search } = useLocation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user.foto_profile} alt={user.nama} />
					<AvatarFallback>{user.nama.slice(0, 2)}</AvatarFallback>
				</Avatar>

				<span className="sr-only">Open Profile Popover</span>
			</DropdownMenuTrigger>

			<Dialog>
				<DropdownMenuContent align="end">
					{/* Dialog trigger for user profile detail */}
					<DialogTrigger asChild>
						<DropdownMenuItem asChild className="gap-1">
							<Link to={{ pathname: `/mahasiswa/${user.id}`, search }}>
								<UserIcon size={16} />
								<span>Profil</span>
							</Link>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem className="gap-1" variant="destructive">
						<LogOutIcon size={16} />
						<span>Keluar</span>
					</DropdownMenuItem>
				</DropdownMenuContent>

				{/* Dialog content for user profile detail */}
				<MahasiswaProfileDetail
					isOwnProfile
					isSeenByAdmin={false}
					user={user}
				/>
			</Dialog>
		</DropdownMenu>
	);
}
