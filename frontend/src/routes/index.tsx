import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { MainMahasiswaPage } from '~/features/mahasiswa/routes/main-mahasiswa-page';
import { MainAdminPage } from '~/features/admin/routes/main-admin-page';
import { MahasiswaLoginPage } from '~/features/authentication/routes/mahasiswa-login-page';
import { AdminLoginPage } from '~/features/authentication/routes/admin-login-page';
import { Root } from '~/root';

export const router = createBrowserRouter([
	{
		path: '',
		errorElement: <ErrorPage />,
		children: [
			{ path: '/mahasiswa/login', element: <MahasiswaLoginPage /> },
			{ path: '/admin/login', element: <AdminLoginPage /> },
			{
				path: '/',
				element: <Root />,
				children: [
					{
						path: 'mahasiswa',
						element: <MainMahasiswaPage />,
						children: [
							{ path: ':mahasiswaId', element: <MainMahasiswaPage /> },
						],
					},
					{
						path: 'admin',
						element: <MainAdminPage />,
						children: [
							{ path: 'mahasiswa/:mahasiswaId', element: <MainAdminPage /> },
							{ path: ':adminId', element: <MainAdminPage /> },
						],
					},
				],
			},
		],
	},
]);
