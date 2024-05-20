import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { env } from '~/config/env';

type AppProviderProps = {
	children: React.ReactNode;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { refetchOnWindowFocus: false, retry: 2 },
	},
});

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{env.DEV && <ReactQueryDevtools />}
			{children}
		</QueryClientProvider>
	);
};
