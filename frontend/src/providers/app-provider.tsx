import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { env } from '~/config/env';
import { queryClient } from '~/lib/react-query';
import { TourContextProvider } from './tour-provider';
import { ThemeProvider } from 'next-themes';
import { UpdateIcon } from '@radix-ui/react-icons';

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<React.Suspense
			fallback={
				<div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-neutral-950">
					<UpdateIcon className="text-2xl animate-spin text-sky-600 dark:text-sky-800" />
				</div>
			}
		>
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
		</React.Suspense>
	);
};
