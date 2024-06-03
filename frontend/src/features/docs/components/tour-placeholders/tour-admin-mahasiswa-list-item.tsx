import { Link, LinkProps } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui';
import { MAHASISWA_PREVIEW_PLACEHOLDER } from '~/constants/placeholders';
import { useHandleAdminMahasiswaPath } from '~/features/admin/hooks';

export function TourAdminMahasiswaListItem(props: Omit<LinkProps, 'to'>) {
	const { toAdminMahasiswaDetailPath } = useHandleAdminMahasiswaPath(
		MAHASISWA_PREVIEW_PLACEHOLDER.id,
	);

	return (
		<Link
			{...props}
			id="mahasiswa-profile"
			to={toAdminMahasiswaDetailPath}
			className="flex items-center w-full gap-4 p-2 transition-colors bg-white border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 dark:hover:bg-sky-800 dark:hover:border-sky-700 hover:border-sky-200 hover:bg-sky-50"
		>
			<Avatar className="w-12 h-12">
				<AvatarImage src={MAHASISWA_PREVIEW_PLACEHOLDER.foto_profile} />
				<AvatarFallback>
					{MAHASISWA_PREVIEW_PLACEHOLDER.nama.slice(0, 2)}
				</AvatarFallback>
			</Avatar>

			<div className="flex flex-col text-start grow">
				<p className="text-sm text-neutral-500 dark:text-neutral-400">
					{MAHASISWA_PREVIEW_PLACEHOLDER.nim}
				</p>
				<h2 className="font-medium">{MAHASISWA_PREVIEW_PLACEHOLDER.nama}</h2>
			</div>
		</Link>
	);
}
