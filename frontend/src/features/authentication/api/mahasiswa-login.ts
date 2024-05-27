import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { getErrorMessage } from '~/utils/get-error-message';

export async function mahasiswaLogin(nim: string, password: string) {
	try {
		const response = await api.post<
			ApiResponse<{ message: string; token: string }>
		>('/mahasiswa/login', { nim, password });

		localStorage.setItem('token', response.data.success.token);
		localStorage.setItem('login_type', 'mahasiswa');

		return response.data.success.message;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
}
