import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { getErrorMessage } from '~/utils/get-error-message';

export async function logout() {
	try {
		const response = await api.post<
			ApiResponse<{ message: string; token: string }>
		>('/logout');

		return response.data.success.message;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
}
