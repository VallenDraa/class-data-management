import axios from 'axios';
import { toast } from 'sonner';
import { env } from '~/config/env';
import { getAuthToken, removeAuthToken } from '~/utils/auth-token';
import { getErrorMessage } from '~/utils/get-error-message';

export const api = axios.create({
	baseURL: env.BASE_API_URL,
});

api.interceptors.request.use(config => {
	if (config.headers) {
		config.headers.Accept = 'application/json';
	}

	const token = getAuthToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	response => response,
	error => {
		if (error instanceof Error) {
			toast.error(getErrorMessage(error));

			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401 || error.response?.status === 403) {
					removeAuthToken();
					window.location.href = '/mahasiswa/login';
				}
			}
		}

		return Promise.reject(error);
	},
);
