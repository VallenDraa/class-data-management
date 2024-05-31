import { AppProvider } from '~/providers';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { router } from './routes';
import { Toaster } from './components/ui';

function App() {
	return (
		<ThemeProvider
			enableSystem
			themes={['dark', 'light', 'system']}
			attribute="class"
		>
			<AppProvider>
				<RouterProvider router={router} />
				<Toaster />
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;
