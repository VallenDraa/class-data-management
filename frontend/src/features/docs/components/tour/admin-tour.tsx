/* eslint-disable react-refresh/only-export-components */
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {
	useCreateMahasiswaTour,
	useDeleteMahasiswaTour,
	useEditAdminMahasiswaTour,
	useSearchMahasiswaTour,
} from '~/features/docs/hooks';

export function AdminTour() {
	const { showEditProfileTour } = useEditAdminMahasiswaTour();
	const { showSearchMahasiswa } = useSearchMahasiswaTour();
	const { showCreateMahasiswaTour } = useCreateMahasiswaTour();
	const { showDeleteMahasiswaTour } = useDeleteMahasiswaTour();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="px-0 w-9">
					<QuestionMarkCircledIcon className="w-5 h-5" />
					<span className="sr-only">Toggle User Guides</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => showSearchMahasiswa('/admin')}>
					Cara Cari Mahasiswa
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => showCreateMahasiswaTour('/admin')}>
					Cara Tambah Mahasiswa
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => showEditProfileTour('/admin', '/admin')}
				>
					Cara Edit Mahasiswa
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => showDeleteMahasiswaTour('/admin', '/admin')}
				>
					Cara Hapus Mahasiswa
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
