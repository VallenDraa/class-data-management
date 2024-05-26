import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { env } from '~/config/env';
import { queryClient } from '~/lib/react-query';

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{env.DEV && <ReactQueryDevtools />}
			{children}
		</QueryClientProvider>
	);
};
