import * as React from 'react';
import { useUrlState } from './use-url-state';
import debounce from 'just-debounce';

export function useDebouncedUrlKeyword(ms: number, defaultValue: string = '') {
	const [activeKeyword, setActiveKeyword] = useUrlState<string>(
		'keyword',
		defaultValue,
	);

	const debouncedSetActiveKeyword = React.useMemo(
		() => debounce((value: string) => setActiveKeyword(value), ms),
		[setActiveKeyword, ms],
	);

	return { activeKeyword, setActiveKeyword: debouncedSetActiveKeyword };
}
