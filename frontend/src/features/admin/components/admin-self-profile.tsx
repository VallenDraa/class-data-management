import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	Skeleton,
	AvatarWithSkeleton,
} from '~/components/ui';
import { useGetAdminSelf } from '../api';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useHandleAdminPath } from '../hooks';
import { useHandleLogout } from '~/hooks';

export function AdminSelfProfile() {
	const { data: admin, isLoading: isAdminLoading } = useGetAdminSelf();

	const { toAdminDetailPath } = useHandleAdminPath();
	const { handleLogout } = useHandleLogout('/admin/login');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-full">
				<AvatarWithSkeleton
					isLoading={isAdminLoading || !admin}
					src={admin?.foto_profile ?? ''}
					alt={admin?.nama ?? ''}
					fallback={admin?.nama.slice(0, 2) ?? ''}
				/>

				<span className="sr-only">Open Profile Popover</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{/* Dialog trigger for user profile detail */}
				<DropdownMenuItem asChild className="gap-1">
					{!isAdminLoading && admin ? (
						<Link to={toAdminDetailPath()}>
							<PersonIcon />
							<span>Profil</span>
						</Link>
					) : (
						<Skeleton className="w-full h-8 rounded" />
					)}
				</DropdownMenuItem>

				<DropdownMenuItem
					className="gap-1"
					onClick={handleLogout}
					variant="destructive"
				>
					<ExitIcon />
					<span>Keluar</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
