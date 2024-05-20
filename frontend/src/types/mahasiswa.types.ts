export type Alamat = {
	alamat: string;
	latitude: number;
	longitude: number;
};

export type Mahasiswa = {
	id: number;
	nama: string;
	/** Profile picture URL */
	foto_profile?: string;
	nim: string;
	/** ISO Date string */
	tanggal_lahir: string;
	no_telepon?: string;
	list_kesukaan: string[];
	alamat: Alamat;
};
export type MahasiswaInsert = Omit<Mahasiswa, 'id'>;
export type MahasiswaUpdate = Partial<Omit<Mahasiswa, 'id'>>;

export type HistoryMahasiswa = {
	id: number;
	mahasiswa_id: number;
	aksi: string;
};
