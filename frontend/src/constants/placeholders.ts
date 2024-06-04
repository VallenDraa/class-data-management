import { MahasiswaHistory } from '~/features/admin/types';
import { Mahasiswa, MahasiswaPreview } from '~/features/mahasiswa/types';

export const VOID_FN = () => {};

export const MAHASISWA_PREVIEW_PLACEHOLDER: MahasiswaPreview = {
	foto_profile: 'https://picsum.photos/150',
	id: 900,
	nama: 'Fulan Bin Fulan',
	nim: '11220910000001',
};

export const MAHASISWA_PLACEHOLDER: Mahasiswa = {
	...MAHASISWA_PREVIEW_PLACEHOLDER,
	alamat: 'Jl. Jakarta No. 1 Kecamatan Kota',
	latitude: '-6.123456',
	longitude: '106.123456',
	list_kesukaan: ['Menyanyi', 'Programming', 'Musik'],
	tanggal_lahir: '2000-01-01',
	no_telepon: '081234567890',
};

export const MAHASISWA_HISTORY_LIST_PLACEHOLDER: MahasiswaHistory[] = [
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Logout',
		created_at: '2024-05-11',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Mengubah password',
		created_at: '2024-04-05',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Login',
		created_at: '2024-03-18',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Logout',
		created_at: '2024-02-02',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Melihat Profil',
		created_at: '2024-01-15',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Login',
		created_at: '2023-12-01',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Mengedit Profil',
		created_at: '2023-11-20',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Mencari mahasiswa',
		created_at: '2023-10-29',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Login',
		created_at: '2023-09-10',
	},
	{
		nim: '11220910000001',
		nama: 'Fulan Bin Fulan',
		aksi: 'Logout',
		created_at: '2023-08-25',
	},
];
