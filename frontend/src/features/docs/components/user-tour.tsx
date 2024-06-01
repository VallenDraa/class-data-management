/* eslint-disable react-refresh/only-export-components */
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useEditMahasiswaSelfTour, useSearchMahasiswaTour } from '../hooks';

export function UserTour() {
	const { showEditProfileTour } = useEditMahasiswaSelfTour();
	const { showSearchMahasiswa } = useSearchMahasiswaTour();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="px-0 w-9">
					<QuestionMarkCircledIcon className="w-5 h-5" />
					<span className="sr-only">Toggle User Guides</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={showSearchMahasiswa}>
					Tutorial Cari Mahasiswa
				</DropdownMenuItem>
				<DropdownMenuItem onClick={showEditProfileTour}>
					Tutorial Edit Profil
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
