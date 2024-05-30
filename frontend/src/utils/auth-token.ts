import { toast } from 'sonner';

export type LoginType = 'admin' | 'mahasiswa';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_LOGIN_TYPE_KEY = 'login_type';

export function getLoginType() {
	const loginType = localStorage.getItem(AUTH_LOGIN_TYPE_KEY);

	if (loginType !== 'admin' && loginType !== 'mahasiswa') {
		removeAuthToken();
		return;
	}

	return loginType as LoginType;
}

export function getAuthToken() {
	const token = localStorage.getItem(AUTH_TOKEN_KEY);

	return token;
}

export function setAuthToken(tokenKey: string, loginType: LoginType) {
	try {
		localStorage.setItem(AUTH_TOKEN_KEY, tokenKey);
		localStorage.setItem(AUTH_LOGIN_TYPE_KEY, loginType);
	} catch (error) {
		toast.error('Gagal menyimpan token!');
	}
}

export function removeAuthToken() {
	try {
		localStorage.removeItem(AUTH_TOKEN_KEY);
		localStorage.removeItem(AUTH_LOGIN_TYPE_KEY);
	} catch (error) {
		toast.error('Gagal menghapus token!');
	}
}
