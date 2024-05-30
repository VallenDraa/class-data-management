/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import L from 'leaflet';
import {
	type GeocoderControlOptions,
	type MarkGeocodeEvent,
} from 'leaflet-control-geocoder/dist/control';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import axios from 'axios';

export type LeafletControlGeocoderProps = {
	position: L.LatLng;
	onPositionChange: (e: L.LatLng) => void;
};

async function reverseGeocode(lat: number, lng: number) {
	const {
		data: { display_name },
	} = await axios.get<{
		display_name: string;
	}>(
		`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
	);

	return display_name;
}

export function LeafletControlGeocoder(props: LeafletControlGeocoderProps) {
	const { position, onPositionChange } = props;

	const map = useMap();

	const defaultMarkerRef = React.useRef<L.Marker | null>(null);
	const searchResultMarkerRef = React.useRef<L.Marker | null>(null);

	const setMarkerAddress = React.useCallback(
		async (marker: L.Marker, lat: number, lng: number) => {
			try {
				marker.bindPopup(L.popup({ content: 'Memuat alamat...' }));

				const address = await reverseGeocode(lat, lng);
				marker.bindPopup(L.popup({ content: address }));
			} catch (error) {
				marker.bindPopup(L.popup({ content: 'Gagal memuat alamat' }));
			}
		},
		[],
	);

	const handleMarkerDragEnd = React.useCallback(
		async (e: L.DragEndEvent) => {
			const latLng = e.target.getLatLng();
			setMarkerAddress(e.target, latLng.lat, latLng.lng);

			onPositionChange(latLng);
		},
		[onPositionChange, setMarkerAddress],
	);

	// Handle default marker
	React.useEffect(() => {
		defaultMarkerRef.current = L.marker(position, {
			draggable: true,
		})
			.addTo(map)
			.on('dragend', handleMarkerDragEnd);

		setMarkerAddress(defaultMarkerRef.current, position.lat, position.lng);

		return () => {
			defaultMarkerRef.current?.removeFrom(map);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle location search
	React.useEffect(() => {
		const leafletControl = L.Control as any;

		const geocoderControl = leafletControl
			.geocoder({
				placeholder: 'Cari lokasi...',
				geocoder: leafletControl.Geocoder.nominatim(),
				suggestMinLength: 1,
				errorMessage: 'Lokasi tidak bisa ditemukan.',
				defaultMarkGeocode: false,
			} satisfies Partial<GeocoderControlOptions>)
			.on('markgeocode', (e: MarkGeocodeEvent) => {
				defaultMarkerRef.current?.removeFrom(map);

				if (searchResultMarkerRef) {
					searchResultMarkerRef.current?.removeFrom(map);
				}

				searchResultMarkerRef.current = L.marker(e.geocode.center, {
					draggable: true,
				})
					.on('dragend', handleMarkerDragEnd)
					.addTo(map);

				map.setView(e.geocode.center, 15, {
					animate: true,
					easeLinearity: 0.5,
				});

				setMarkerAddress(
					searchResultMarkerRef.current,
					e.geocode.center.lat,
					e.geocode.center.lng,
				);
				onPositionChange(e.geocode.center);
			});

		map.addControl(geocoderControl);

		return () => {
			map.removeControl(geocoderControl);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}
