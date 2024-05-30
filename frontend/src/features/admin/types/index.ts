export type Admin = {
	id: number;
	email: string;
	nama: string;
	jabatan: string;
	foto_profile: string;
};
export type AdminUpdate = Partial<Omit<Admin, 'id' | 'foto_profile'>>;

export type MahasiswaHistory = {
	nim: string;
	nama: string;
	aksi: string;
	created_at: string;
};
export type GetMahasiswaHistorySearchParams = {
	mahasiswaId: number;
	page?: number;
};
