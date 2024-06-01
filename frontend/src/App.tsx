import { AppProvider } from '~/providers';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from './components/ui';

function App() {
	return (
		<AppProvider>
			<RouterProvider router={router} />
			<Toaster />
		</AppProvider>
	);
}

export default App;
