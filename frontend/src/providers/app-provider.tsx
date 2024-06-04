import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { env } from '~/config/env';
import { queryClient } from '~/lib/react-query';
import { TourContextProvider } from './tour-provider';
import { ThemeProvider } from 'next-themes';

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<ThemeProvider
			enableSystem
			themes={['dark', 'light', 'system']}
			attribute="class"
		>
			<QueryClientProvider client={queryClient}>
				<TourContextProvider>
					{env.DEV && <ReactQueryDevtools />}
					{children}
				</TourContextProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};
