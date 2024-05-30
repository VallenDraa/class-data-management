import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { setAuthToken } from '~/utils/auth-token';
import { getErrorMessage } from '~/utils/get-error-message';

export async function adminLogin(email: string, password: string) {
	try {
		const response = await api.post<
			ApiResponse<{ message: string; token: string }>
		>('/admin/login', { email, password });

		setAuthToken(response.data.success.token, 'admin');

		return response.data.success.message;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
}
