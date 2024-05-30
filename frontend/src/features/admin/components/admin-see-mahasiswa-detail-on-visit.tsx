import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog } from '~/components/ui';
import { AdminMahasiswaProfileDetail } from './admin-mahasiswa-profile-detail';
import { useHandleAdminPath } from '../hooks';

export type AdminSeeMahasiwaDetailOnVisitProps = {
	mahasiswaId: number | undefined;
};

export function AdminSeeMahasiwaDetailOnVisit(
	props: AdminSeeMahasiwaDetailOnVisitProps,
) {
	const { mahasiswaId } = props;

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
		<Dialog open={!!(isSeenForTheFirstTime && mahasiswaId)}>
			<AdminMahasiswaProfileDetail
				isDetailOpen={!!(isSeenForTheFirstTime && mahasiswaId)}
				mahasiswaId={Number(mahasiswaId)}
				onDetailClose={() => {
					setIsSeenForTheFirstTime(false);
					navigateToAdminMainPath();
				}}
			/>
		</Dialog>
	);
}
