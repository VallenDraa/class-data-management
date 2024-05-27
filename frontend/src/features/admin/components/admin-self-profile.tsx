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
	dropdownMenuitemVariants,
} from '~/components/ui';
import { useGetAdminSelf } from '../api';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AdminProfileDetail } from './admin-profile-detail';

export function AdminSelfProfile() {
	const { data: admin, isLoading: isAdminLoading } = useGetAdminSelf();

	const { search } = useLocation();
	const navigate = useNavigate();

	const [isDetailOpen, setIsDetailOpen] = React.useState(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{!isAdminLoading && admin ? (
					<Avatar>
						<AvatarImage src={admin.foto_profile} alt={admin.nama} />
						<AvatarFallback>{admin.nama.slice(0, 2)}</AvatarFallback>
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
							{!isAdminLoading && admin ? (
								<Link to={{ pathname: `/admin/${admin.id}`, search }}>
									<PersonIcon />
									<span>Profil</span>
								</Link>
							) : (
								<Skeleton className="w-full h-8 rounded" />
							)}
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem asChild className="gap-1">
						<Link
							to="/admin/login"
							className={dropdownMenuitemVariants({
								variant: 'destructive',
							})}
						>
							<ExitIcon />
							<span>Keluar</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>

				{/* Dialog content for user profile detail */}
				{!isAdminLoading && admin && (
					<AdminProfileDetail
						detailTitle="Profil Anda"
						admin={admin}
						onDetailClose={() => navigate(`/admin${search}`)}
					/>
				)}
			</Dialog>
		</DropdownMenu>
	);
}
