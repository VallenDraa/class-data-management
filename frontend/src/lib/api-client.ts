import Axios from 'axios';
import { env } from '~/config/env';

export const api = Axios.create({
	baseURL: env.BASE_API_URL,
});

api.interceptors.request.use(config => {
	if (config.headers) {
		config.headers.Accept = 'application/json';
	}

	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	response => response,
	error => {
		const message = error.response?.data?.message || error.message;

		console.error(message);
		return Promise.reject(error);
	},
);
