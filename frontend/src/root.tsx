import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './lib/auth';
import { AppSearchQueryContextProvider } from './providers';
import { Helmet } from 'react-helmet-async';
import { useTheme } from 'next-themes';

export function Root() {
	const { resolvedTheme } = useTheme();

	return (
		<ProtectedRoute>
			<AppSearchQueryContextProvider>
				<Helmet>
					<meta
						name="theme-color"
						content={resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff'}
					/>
				</Helmet>
				<div className="relative z-10 bg-white dark:bg-neutral-950">
					<Outlet />
				</div>
			</AppSearchQueryContextProvider>
		</ProtectedRoute>
	);
}
