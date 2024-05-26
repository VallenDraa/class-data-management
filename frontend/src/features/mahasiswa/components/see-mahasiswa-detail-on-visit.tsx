import * as React from 'react';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';
import { useLocation, useNavigate } from 'react-router-dom';

export type SeeMahasiwaDetailOnVisitProps = {
	isOwnProfile: boolean;
	mahasiswaId: number | undefined;
};

export function SeeMahasiwaDetailOnVisit(props: SeeMahasiwaDetailOnVisitProps) {
	const { isOwnProfile, mahasiswaId } = props;

	const { search } = useLocation();
	const navigate = useNavigate();

	const [isSeenForTheFirstTime, setIsSeenForTheFirstTime] =
		React.useState(true);

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
