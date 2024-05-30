import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog } from '~/components/ui';
import {
	AdminProfileDetail,
	AdminProfileDetailError,
	AdminProfileDetailSkeleton,
} from './admin-profile-detail';
import { useGetAdminSelf } from '../api';
import { useHandleAdminPath } from '../hooks';

export type SeeAdminDetailOnVisitProps = {
	adminId: number | undefined;
};

export function SeeAdminDetailOnVisit(props: SeeAdminDetailOnVisitProps) {
	const { adminId } = props;
	const { data: admin, isLoading: isAdminLoading, error } = useGetAdminSelf();

	const { pathname } = useLocation();
	const initialPathname = React.useRef(pathname);

	const { navigateToAdminMainPath } = useHandleAdminPath();

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
							navigateToAdminMainPath();
						}}
					/>
				) : (
					<AdminProfileDetailSkeleton />
				)
			) : (
				<AdminProfileDetailError message={error.message} />
			)}
		</Dialog>
	);
}
