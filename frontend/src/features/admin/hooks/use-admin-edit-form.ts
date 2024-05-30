import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Admin, AdminUpdate } from '../types';
import { updateAdminValidator } from '../api';

export function useAdminEditForm(
	admin: Admin,
	onDataUpdate: (data: AdminUpdate) => void,
) {
	const [isEditing, setIsEditing] = React.useState(false);
	const defaultValues = {
		nama: admin.nama,
		email: admin.email,
	};

	const form = useForm<AdminUpdate>({
		resolver: zodResolver(updateAdminValidator),
		defaultValues,
	});

	const handleDataUpdate = React.useCallback(
		async (data: AdminUpdate) => {
			await onDataUpdate(data);
			setIsEditing(false);
		},
		[onDataUpdate],
	);

	return { isEditing, adminForm: form, handleDataUpdate };
}
