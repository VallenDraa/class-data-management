import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		path: '',
		lazy: async () => {
			const { ErrorPage } = await import('./error-page');
			return { errorElement: <ErrorPage /> };
		},
		children: [
			{
				path: '/mahasiswa/login',
				lazy: async () => {
					const { MahasiswaLoginPage } = await import(
						'~/features/authentication/routes/mahasiswa-login-page'
					);
					return { Component: MahasiswaLoginPage };
				},
			},
			{
				path: '/admin/login',
				lazy: async () => {
					const { AdminLoginPage } = await import(
						'~/features/authentication/routes/admin-login-page'
					);
					return { Component: AdminLoginPage };
				},
			},
			{
				path: '/mahasiswa/register',
				lazy: async () => {
					const { MahasiswaRegisterPage } = await import(
						'~/features/authentication/routes/mahasiswa-register-page'
					);
					return { Component: MahasiswaRegisterPage };
				},
			},
			{
				path: '/',
				lazy: async () => {
					const { Root } = await import('~/root');

					return { Component: Root };
				},
				children: [
					{
						path: 'mahasiswa',
						lazy: async () => {
							const { MainMahasiswaPage } = await import(
								'~/features/mahasiswa/routes/main-mahasiswa-page'
							);
							return { Component: MainMahasiswaPage };
						},
					},
					{
						path: 'mahasiswa/self',
						lazy: async () => {
							const { SelfMahasiswaProfilePage } = await import(
								'~/features/mahasiswa/routes/self-mahasiswa-profile-page'
							);
							return { Component: SelfMahasiswaProfilePage };
						},
					},
					{
						path: 'mahasiswa/:mahasiswaId',
						lazy: async () => {
							const { MahasiswaProfilePage } = await import(
								'~/features/mahasiswa/routes/mahasiswa-profile-page'
							);
							return { Component: MahasiswaProfilePage };
						},
					},
					{
						path: 'admin',

						lazy: async () => {
							const { MainAdminPage } = await import(
								'~/features/admin/routes/main-admin-page'
							);
							return { Component: MainAdminPage };
						},
					},
					{
						path: 'admin/self',
						lazy: async () => {
							const { SelfAdminProfilePage } = await import(
								'~/features/admin/routes/self-admin-profile-page'
							);
							return { Component: SelfAdminProfilePage };
						},
					},
					{
						path: 'admin/mahasiswa/:mahasiswaId',

						lazy: async () => {
							const { AdminMahasiswaProfilePage } = await import(
								'~/features/admin/routes/admin-mahasiswa-profile-page'
							);
							return { Component: AdminMahasiswaProfilePage };
						},
					},
				],
			},
		],
	},
]);
