import { format } from 'date-fns';
import z from 'zod';
import { api } from '~/lib/api-client';
import { ApiResponse } from '~/types';
import { getErrorMessage } from '~/utils/get-error-message';

export const mahasiswaRegisterValidator = z.object({
	nim: z.string().trim().min(1, 'NIM tidak valid.'),
	nama: z.string().trim().min(1, 'Nama tidak boleh kosong.'),
	tanggal_lahir: z.string().trim().min(1, 'Tanggal tidak boleh kosong'),
	alamat: z.string().trim().min(1, 'Alamat tidak boleh kosong.'),
});

export type MahasiswaRegisterSchema = z.infer<
	typeof mahasiswaRegisterValidator
>;

export async function mahasiswaRegister(data: MahasiswaRegisterSchema) {
	try {
		const validatedData = await mahasiswaRegisterValidator.parseAsync(data);

		const response = await api.post<
			ApiResponse<{ message: string; token: string }>
		>('/mahasiswa/register', {
			...validatedData,
			tanggal_lahir: format(validatedData.tanggal_lahir, 'yyyy-MM-dd'),
		});

		return response.data.success.message;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
}
