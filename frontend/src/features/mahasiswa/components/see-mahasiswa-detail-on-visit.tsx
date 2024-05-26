import * as React from 'react';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';
import { useLocation, useNavigate } from 'react-router-dom';

export type SeeMahasiwaDetailOnVisitProps = {
	isOwnProfile: boolean;
	mahasiswaId: number | undefined;
};

export function SeeMahasiwaDetailOnVisit(props: SeeMahasiwaDetailOnVisitProps) {
	const { isOwnProfile, mahasiswaId } = props;

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

	return isSeenForTheFirstTime && mahasiswaId ? (
		<MahasiswaProfileDetail
			isDetailOpen
			isSeenByAdmin={false}
			isOwnProfile={isOwnProfile}
			mahasiswaId={Number(mahasiswaId)}
			detailTitle={isOwnProfile ? 'Profil Anda' : undefined}
			onDetailClose={() => {
				setIsSeenForTheFirstTime(false);
				navigate(`/mahasiswa${search}`);
			}}
		/>
	) : null;
}
