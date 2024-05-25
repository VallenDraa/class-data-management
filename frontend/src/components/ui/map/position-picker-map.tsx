import * as React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import {
	LeafletControlGeocoder,
	LeafletControlGeocoderProps,
} from './control-geocoder';

export type PositionPickerMapProps = LeafletControlGeocoderProps;

export function PositionPickerMap(props: PositionPickerMapProps) {
	const { position, onPositionChange } = props;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialPosition = React.useMemo(() => ({ ...position }), []);

	return (
		<MapContainer
			zoom={12}
			scrollWheelZoom={false}
			center={initialPosition}
			className="w-full h-full"
		>
			<TileLayer
				attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<LeafletControlGeocoder
				position={position}
				onPositionChange={onPositionChange}
			/>
		</MapContainer>
	);
}
