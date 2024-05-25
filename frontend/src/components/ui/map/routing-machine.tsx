import * as React from 'react';
import L from 'leaflet';
import { type Coordinate } from '~/types';
import { useMap } from 'react-leaflet';

import 'leaflet-routing-machine';

export type RoutingMachineProps = {
	startCoordinate: Coordinate;
	endCoordinate: Coordinate;
};

export function RoutingMachine(props: RoutingMachineProps) {
	const { startCoordinate, endCoordinate } = props;

	const map = useMap();

	React.useEffect(() => {
		const waypoints = [
			L.latLng(startCoordinate.lat, startCoordinate.lng),
			L.latLng(endCoordinate.lat, endCoordinate.lng),
		];

		const control = L.Routing.control({
			show: false,
			waypoints,
			plan: L.Routing.plan(waypoints, {
				createMarker(i, wp) {
					const marker = L.marker(wp.latLng, { draggable: false });

					if (i === 0) {
						if (startCoordinate?.markerMessage) {
							marker.bindTooltip(startCoordinate.markerMessage);
						}
					}

					if (i === 1) {
						if (endCoordinate?.markerMessage) {
							marker.bindTooltip(endCoordinate.markerMessage);
						}

						marker.setIcon(
							new L.Icon({
								iconUrl: '/marker-icon-2x-red.png',
								shadowUrl: '/marker-shadow.png',
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								popupAnchor: [1, -34],
								shadowSize: [41, 41],
							}),
						);
					}

					return marker;
				},
			}),
			lineOptions: {
				extendToWaypoints: true,
				missingRouteTolerance: 100,
				styles: [{ color: '#3b82f6', opacity: 1, weight: 5 }],
			},
			addWaypoints: false,
			fitSelectedRoutes: false,
			showAlternatives: false,
		}).addTo(map);

		map.fitBounds(L.latLngBounds(waypoints), { padding: [10, 10] });

		return () => {
			map.removeControl(control);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}
