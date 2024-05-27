import { Separator } from '~/components/ui';
import { MahasiswaHistory } from '../types';

export type MahasiswaHistoryItemProps = {
	history: MahasiswaHistory;
};

export function MahasiswaHistoryItem(props: MahasiswaHistoryItemProps) {
	const { history } = props;

	const date = new Date(history.waktu).toLocaleDateString();
	const time = new Date(history.waktu).toLocaleTimeString();

	return (
		<div className="flex flex-col p-4 gap-2 rounded-md shadow-sm border border-neutral-200">
			<div className="flex flex-col gap-1">
				<div className="text-sm text-neutral-400 flex justify-between items-center">
					<span>Tanggal</span>
					<time dateTime={history.waktu}>{date}</time>
				</div>
				<div className="text-sm text-neutral-400 flex justify-between items-center">
					<span>Waktu</span>
					<time dateTime={history.waktu}>{time}</time>
				</div>
			</div>

			<Separator />
			<div className="capitalize font-medium leading-none flex justify-between items-center">
				<p>Aksi</p>
				<p>{history.aksi}</p>
			</div>
		</div>
	);
}
