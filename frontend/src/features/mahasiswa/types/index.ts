import { type Alamat } from '~/types';

export type Mahasiswa = {
	id: number;
	nama: string;
	/** Profile picture URL */
	foto_profile: string;
	nim: string;
	/** ISO Date string */
	tanggal_lahir: string;
	no_telepon?: string;
	list_kesukaan: string[];
	alamat: Alamat;
};
export type MahasiswaInsert = Omit<Mahasiswa, 'id' | 'foto_profile'>;
export type MahasiswaUpdate = Partial<Omit<Mahasiswa, 'id' | 'foto_profile'>>;

export type HistoryMahasiswa = {
	id: number;
	mahasiswa_id: number;
	aksi: string;
};

export type MahasiswaSearchSortType = 'terbaru' | 'terlama' | 'az' | 'za';
export type GetMahasiswaSearchParams = {
	keyword?: string;
	page?: number;
	sort?: MahasiswaSearchSortType;
};
