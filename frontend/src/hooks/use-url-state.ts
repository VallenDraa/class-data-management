import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUrlState<T extends string>(key: string, state: T) {
	const [searchParams, setSearchParams] = useSearchParams();

	React.useEffect(() => {
		if (searchParams.get(key) !== null) {
			return;
		}

		setSearchParams(params => {
			params.set(key, state);
			return params;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setUrlState = React.useCallback(
		(newState: T) => {
			setSearchParams(params => {
				params.set(key, newState);
				return params;
			});
		},
		[key, setSearchParams],
	);

	return [searchParams.get(key), setUrlState] as [T, (newState: T) => void];
}
