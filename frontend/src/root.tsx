import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './lib/auth';
import { AppSearchQueryContextProvider } from './providers';

export function Root() {
	return (
		<ProtectedRoute>
			<AppSearchQueryContextProvider>
				<div className="relative z-10 bg-white dark:bg-neutral-950">
					<Outlet />
				</div>
			</AppSearchQueryContextProvider>
		</ProtectedRoute>
	);
}
