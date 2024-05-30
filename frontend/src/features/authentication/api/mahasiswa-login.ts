import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { setAuthToken } from '~/utils/auth-token';
import { getErrorMessage } from '~/utils/get-error-message';

export async function mahasiswaLogin(nim: string, password: string) {
	try {
		const response = await api.post<
			ApiResponse<{ message: string; token: string }>
		>('/mahasiswa/login', { nim, password });

		setAuthToken(response.data.success.token, 'mahasiswa');

		return response.data.success.message;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
}
