export type Alamat = {
	alamat: string;
	latitude: string;
	longitude: string;
};

export type Coordinate = L.LatLngLiteral & {
	markerMessage?: string;
};

export type ApiResponse<T> = {
	success: T;
};

export type PaginatedApiResponse<T> = {
	success: {
		data: T;
		jumlah: number;
		last_page: number;
		next_page: number;
	};
};

export type ErrorApiResponse = {
	errors: {
		message: string;
	};
};
