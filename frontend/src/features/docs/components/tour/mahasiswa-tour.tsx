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
	useEditMahasiswaSelfTour,
	useSearchMahasiswaTour,
} from '~/features/docs/hooks';
import { getAuthToken, getLoginType } from '~/utils/auth-token';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function MahasiswaTour() {
	const isAuthenticated =
		getLoginType() === 'mahasiswa' && Boolean(getAuthToken());
	const navigate = useNavigate();

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
				<DropdownMenuItem onClick={() => showSearchMahasiswa('/mahasiswa')}>
					Cara Cari Mahasiswa
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						if (isAuthenticated) {
							showEditProfileTour('/mahasiswa');
						} else {
							toast.warning('Login terlebih dahulu untuk melihat panduan ini.');
							navigate('/mahasiswa/login');
						}
					}}
				>
					Cara Edit Profil
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
