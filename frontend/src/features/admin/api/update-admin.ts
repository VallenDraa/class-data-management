import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { type AdminUpdate } from '../types';
import { idValidator } from '~/utils/validators';
import { api } from '~/lib/api-client';
import { AxiosResponse } from 'axios';
import { ADMIN_QUERY_KEY } from '../constants';

export type UpdateAdminParams = {
	id: number;
	data: AdminUpdate;
};

export type UseUpdateAdminOptions = {
	onSuccess?: (
		data: AxiosResponse,
		variables: UpdateAdminParams,
		context: unknown,
	) => void;
	onError?: (
		error: Error,
		variables: UpdateAdminParams,
		context: unknown,
	) => unknown;
};

export const updateAdminValidator: z.ZodType<AdminUpdate> = z.object({
	nama: z.string().trim().optional(),
	email: z.string().email().trim().optional(),
	jabatan: z.string().trim().optional(),
});

export const updateAdmin = async ({ id, data }: UpdateAdminParams) => {
	const validatedId = await idValidator.parseAsync(id);
	const validatedData = await updateAdminValidator.parseAsync(data);

	return api.put(`/admin/${validatedId}`, validatedData);
};

export const useUpdateAdmin = ({
	onSuccess,
	onError,
}: UseUpdateAdminOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, 'self'] });

			onSuccess?.(data, variables, context);
		},
		onError,
		mutationFn: updateAdmin,
	});
};
