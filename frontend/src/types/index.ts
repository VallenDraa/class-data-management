export type Alamat = {
	alamat: string;
	latitude: string;
	longitude: string;
};

export type Coordinate = L.LatLngLiteral & {
	markerMessage?: string;
};

export type ApiResponse<data> = {
	success: data;
};

export type ErrorApiResponse = {
	errors: {
		message: string;
	};
};
