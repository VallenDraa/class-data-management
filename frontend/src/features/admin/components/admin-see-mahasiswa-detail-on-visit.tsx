import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog } from '~/components/ui';
import { AdminMahasiswaProfileDetail } from './admin-mahasiswa-profile-detail';

export type AdminSeeMahasiwaDetailOnVisitProps = {
	mahasiswaId: number | undefined;
	navigatePathOnClose: string;
};

export function AdminSeeMahasiwaDetailOnVisit(
	props: AdminSeeMahasiwaDetailOnVisitProps,
) {
	const { mahasiswaId, navigatePathOnClose } = props;

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
		<Dialog open={!!(isSeenForTheFirstTime && mahasiswaId)}>
			<AdminMahasiswaProfileDetail
				isDetailOpen={!!(isSeenForTheFirstTime && mahasiswaId)}
				mahasiswaId={Number(mahasiswaId)}
				onDetailClose={() => {
					setIsSeenForTheFirstTime(false);
					navigate(`${navigatePathOnClose}${search}`);
				}}
			/>
		</Dialog>
	);
}
