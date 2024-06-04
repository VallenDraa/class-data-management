import { Separator } from '~/components/ui';
import { MahasiswaHistory } from '../types';

export type MahasiswaHistoryItemProps = {
	history: MahasiswaHistory;
};

export function MahasiswaHistoryItem(props: MahasiswaHistoryItemProps) {
	const { history } = props;

	return (
		<div className="flex flex-col gap-2 p-4 border rounded-md shadow-sm border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
			<div className="flex items-center justify-between gap-2 text-sm text-neutral-400">
				<span>Tanggal</span>
				<time dateTime={history.created_at}>{history.created_at}</time>
			</div>

			<Separator />
			<div className="flex items-center justify-between gap-2 text-sm font-medium leading-none capitalize sm:text-base">
				<p>Aksi</p>
				<p className="flex-wrap">{history.aksi}</p>
			</div>
		</div>
	);
}
