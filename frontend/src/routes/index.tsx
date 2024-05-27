import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { MainMahasiswaPage } from '~/features/mahasiswa/routes/main-mahasiswa-page';
import { MainAdminPage } from '~/features/admin/routes/main-admin-page';

export const router = createBrowserRouter([
	{
		path: '',
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Navigate to="/mahasiswa" />,
			},
			{
				path: '/mahasiswa',
				element: <MainMahasiswaPage />,
				children: [{ path: ':mahasiswaId', element: <MainMahasiswaPage /> }],
			},
			{
				path: '/admin',
				element: <MainAdminPage />,
				children: [
					{ path: 'mahasiswa/:mahasiswaId', element: <MainAdminPage /> },
					{ path: ':adminId', element: <MainAdminPage /> },
				],
			},
		],
	},
]);
