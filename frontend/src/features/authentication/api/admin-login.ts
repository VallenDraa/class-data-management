import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { getErrorMessage } from '~/utils/get-error-message';

export async function adminLogin(email: string, password: string) {
	try {
		const response = await api.post<
			ApiResponse<{ message: string; token: string }>
		>('/admin/login', { email, password });

		localStorage.setItem('token', response.data.success.token);
		localStorage.setItem('login_type', 'admin');

		return response.data.success.message;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
}
