import { type Admin } from '../types';
// import { api } from '~/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_QUERY_KEY } from '../constants';

export const getAdminSelf = async (): Promise<Admin> => {
	return {
		id: 1,
		nama: 'Admin',
		email: 'admin@mail.com',
		foto_profile: 'https://randomuser.me/api/portraits',
		jabatan: 'Admin',
	};
};

export const useGetAdminSelf = () => {
	return useQuery({
		queryKey: [ADMIN_QUERY_KEY, 'self'],
		queryFn: getAdminSelf,
	});
};
