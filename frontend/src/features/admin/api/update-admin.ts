import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { type AdminUpdate } from '../types';
// import { idValidator } from '~/utils/validators';
// import { api } from '~/lib/api-client';
// import { AxiosResponse } from 'axios';
import { ADMIN_QUERY_KEY } from '../constants';

export type UpdateAdminParams = {
	id: number;
	data: AdminUpdate;
};

export const updateAdminValidator: z.ZodType<AdminUpdate> = z.object({
	nama: z.string().trim().optional(),
	email: z.string().email().trim().optional(),
	jabatan: z.string().trim().optional(),
});

export const updateAdmin = async (_param: UpdateAdminParams) => {
	//! Not implemented
	console.log(_param);
};

export const useUpdateAdmin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateAdmin,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: [ADMIN_QUERY_KEY, 'self'],
			});
		},
	});
};
