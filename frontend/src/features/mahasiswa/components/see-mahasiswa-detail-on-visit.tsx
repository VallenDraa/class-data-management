import * as React from 'react';
import { MahasiswaProfileDetail } from './mahasiswa-profile-detail';

export type SeeMahasiwaDetailOnVisitProps = {
	mahasiswaId: number | undefined;
};

export function SeeMahasiwaDetailOnVisit(props: SeeMahasiwaDetailOnVisitProps) {
	const { mahasiswaId } = props;

	const [isSeenForTheFirstTime, setIsSeenForTheFirstTime] =
		React.useState(true);

	return isSeenForTheFirstTime && mahasiswaId ? (
		<MahasiswaProfileDetail
			isDetailOpen
			isSeenByAdmin={false}
			mahasiswaId={Number(mahasiswaId)}
			isOwnProfile={false}
			onDetailClose={() => setIsSeenForTheFirstTime(false)}
		/>
	) : null;
}
