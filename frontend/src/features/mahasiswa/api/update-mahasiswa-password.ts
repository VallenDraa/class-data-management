import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api-client';

export type UpdateMahasiswaPasswordParams = {
	recent_password: string;
	new_password: string;
	confirm_password: string;
};

export const changePasswordValidator = z
	.object({
		recent_password: z.string().trim().min(8, 'Password sekarang tidak valid!'),
		new_password: z.string().trim().min(8, 'Password baru minimal 8 karakter!'),
		confirm_password: z
			.string()
			.trim()
			.min(8, 'Konfirmasi password baru minimal 8 karakter!'),
	})
	.refine(data => data.confirm_password === data.new_password, {
		message: 'Konfirmasi password tidak sama dengan password baru!',
		path: ['confirm_password'],
	});

export const updateMahasiswaPassword = async ({
	...data
}: UpdateMahasiswaPasswordParams) => {
	const validatedData = await changePasswordValidator.parseAsync(data);

	return api.put(`/mahasiswa/password`, validatedData);
};

export const useUpdateMahasiswaPassword = () => {
	return useMutation({ mutationFn: updateMahasiswaPassword });
};
