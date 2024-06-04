import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { Root } from '~/root';
import { MainMahasiswaPage } from '~/features/mahasiswa/routes/main-mahasiswa-page';
import { MainAdminPage } from '~/features/admin/routes/main-admin-page';
import { MahasiswaLoginPage } from '~/features/authentication/routes/mahasiswa-login-page';
import { AdminLoginPage } from '~/features/authentication/routes/admin-login-page';
import { SelfMahasiswaProfilePage } from '~/features/mahasiswa/routes/self-mahasiswa-profile-page';
import { MahasiswaProfilePage } from '~/features/mahasiswa/routes/mahasiswa-profile-page';
import { AdminMahasiswaProfilePage } from '~/features/admin/routes/admin-mahasiswa-profile-page';
import { SelfAdminProfilePage } from '~/features/admin/routes/self-admin-profile-page';

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
					},
					{
						path: 'mahasiswa/self',
						element: <SelfMahasiswaProfilePage />,
					},
					{
						path: 'mahasiswa/:mahasiswaId',
						element: <MahasiswaProfilePage />,
					},
					{
						path: 'admin',
						element: <MainAdminPage />,
					},
					{
						path: 'admin/self',
						element: <SelfAdminProfilePage />,
					},
					{
						path: 'admin/mahasiswa/:mahasiswaId',
						element: <AdminMahasiswaProfilePage />,
					},
				],
			},
		],
	},
]);
