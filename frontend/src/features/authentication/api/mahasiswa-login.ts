import z from 'zod';
import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { setAuthToken } from '~/utils/auth-token';

export const mahasiswaLoginValidator = z.object({
	nim: z.string().min(1, 'NIM tidak valid'),
	password: z.string().min(1, 'Password tidak boleh kosong'),
});

export type MahasiswaLoginSchema = z.infer<typeof mahasiswaLoginValidator>;

export async function mahasiswaLogin(data: MahasiswaLoginSchema) {
	const validatedData = await mahasiswaLoginValidator.parseAsync(data);

	const response = await api.post<
		ApiResponse<{ message: string; token: string }>
	>('/mahasiswa/login', validatedData);

	setAuthToken(response.data.success.token, 'mahasiswa');

	return response.data.success.message;
}
