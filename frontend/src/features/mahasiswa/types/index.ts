import { type Alamat } from '~/types';

export type MahasiswaPreview = {
	id: number;
	foto_profile: string;
	nama: string;
	nim: string;
};
export type Mahasiswa = Alamat & {
	id: number;
	nama: string;
	/** Profile picture URL */
	foto_profile: string;
	nim: string;
	/** ISO Date string */
	tanggal_lahir: string;
	no_telepon?: string;
	list_kesukaan: string[];
};
export type MahasiswaInsert = Omit<
	Mahasiswa,
	| 'id'
	| 'foto_profile'
	| 'no_telepon'
	| 'list_kesukaan'
	| 'alamat'
	| keyof Alamat
> & { alamat: string };
export type MahasiswaUpdate = Partial<
	Omit<Mahasiswa, 'id' | 'foto_profile' | keyof Alamat>
> & { alamat: Alamat };

export type HistoryMahasiswa = {
	id: number;
	mahasiswa_id: number;
	aksi: string;
};

export type MahasiswaSearchSortType = 'terbaru' | 'terlama' | 'az' | 'za';
export type GetMahasiswaSearchParams = {
	keyword?: string;
	sort?: MahasiswaSearchSortType;
};
