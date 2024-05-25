export type Alamat = {
	alamat: string;
	latitude: string;
	longitude: string;
};

export type Coordinate = L.LatLngLiteral & {
	markerMessage?: string;
};
