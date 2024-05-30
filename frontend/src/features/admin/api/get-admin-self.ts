import { type Admin } from '../types';
import { api } from '~/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_QUERY_KEY } from '../constants';
import {
	DEFAULT_ERROR_MESSAGE,
	getErrorMessage,
} from '~/utils/get-error-message';

export const getAdminSelf = async () => {
	try {
		return (await api.get<Admin>(`/admin`)).data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(getErrorMessage(error));
		}

		throw new Error(DEFAULT_ERROR_MESSAGE);
	}
};

export const useGetAdminSelf = () => {
	return useQuery({
		queryKey: [ADMIN_QUERY_KEY, 'self'],
		queryFn: getAdminSelf,
	});
};
