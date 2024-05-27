import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Skeleton,
} from '~/components/ui';
import { AdminProfileDetail } from './admin-profile-detail';
import { useGetAdminSelf } from '../api';

export type SeeAdminDetailOnVisitProps = {
	adminId: number | undefined;
	navigatePathOnClose: string;
};

export function SeeAdminDetailOnVisit(props: SeeAdminDetailOnVisitProps) {
	const { adminId, navigatePathOnClose } = props;

	const { data: admin, isLoading: isAdminLoading, error } = useGetAdminSelf();

	const { search, pathname } = useLocation();
	const initialPathname = React.useRef(pathname);
	const navigate = useNavigate();

	const [isSeenForTheFirstTime, setIsSeenForTheFirstTime] =
		React.useState(true);

	React.useEffect(() => {
		if (initialPathname.current === pathname) {
			return;
		}

		setIsSeenForTheFirstTime(false);
	}, [pathname]);

	return (
		<Dialog open={!!(isSeenForTheFirstTime && adminId)}>
			{!error ? (
				!isAdminLoading && admin ? (
					<AdminProfileDetail
						admin={admin}
						onDetailClose={() => {
							setIsSeenForTheFirstTime(false);
							navigate(`${navigatePathOnClose}${search}`);
						}}
					/>
				) : (
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="mb-5">Profil Anda</DialogTitle>
						</DialogHeader>

						<div className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
							<div className="flex flex-row items-center w-full gap-4 sm:w-28 sm:flex-col">
								<Skeleton className="h-auto mx-auto w-28 sm:w-full aspect-square rounded-full" />

								<div className="space-y-2 w-full hidden sm:block">
									<Skeleton className="h-8 w-full rounded-md" />
									<Skeleton className="h-8 w-full rounded-md" />
								</div>
							</div>

							<Skeleton className="w-full h-96" />
						</div>
					</DialogContent>
				)
			) : (
				<DialogContent>
					<section className="flex flex-col gap-2 overflow-auto sm:gap-4 sm:flex-row">
						<p>{error.message}</p>
					</section>
				</DialogContent>
			)}
		</Dialog>
	);
}
