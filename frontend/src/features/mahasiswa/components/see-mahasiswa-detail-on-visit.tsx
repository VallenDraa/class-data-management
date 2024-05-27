import * as React from 'react';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog } from '~/components/ui';

export type SeeMahasiwaDetailOnVisitProps = {
	isOwnProfile: boolean;
	mahasiswaId: number | undefined;
	navigatePathOnClose: string;
};

export function SeeMahasiwaDetailOnVisit(props: SeeMahasiwaDetailOnVisitProps) {
	const { isOwnProfile, mahasiswaId, navigatePathOnClose } = props;

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
			<MahasiswaProfileDetail
				isDetailOpen={!!(isSeenForTheFirstTime && mahasiswaId)}
				isOwnProfile={isOwnProfile}
				mahasiswaId={Number(mahasiswaId)}
				detailTitle={isOwnProfile ? 'Profil Anda' : undefined}
				onDetailClose={() => {
					setIsSeenForTheFirstTime(false);
					navigate(`${navigatePathOnClose}${search}`);
				}}
			/>
		</Dialog>
	);
}
