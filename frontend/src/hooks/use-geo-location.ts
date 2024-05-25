import * as React from 'react';

export function useGeoLocation() {
	const [isSupported, setIsSupported] = React.useState(!!navigator.geolocation);
	const [isLoading, setIsLoading] = React.useState(true);
	const [userLocation, setUserLocation] =
		React.useState<L.LatLngLiteral | null>(null);
	const [error, setError] = React.useState<GeolocationPositionError | null>(
		null,
	);

	React.useEffect(() => {
		const getUserLocation = () => {
			setIsLoading(true);

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					position => {
						const { latitude, longitude } = position.coords;

						setUserLocation({ lat: latitude, lng: longitude });
						setIsLoading(false);
					},

					error => setError(error),
				);
			} else {
				setIsSupported(false);
			}
		};

		getUserLocation();
	}, []);

	return { userLocation, isLoading, isSupported, error };
}
