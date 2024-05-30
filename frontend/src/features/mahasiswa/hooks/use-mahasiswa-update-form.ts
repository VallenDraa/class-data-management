import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMahasiswaValidator } from '../api';
import { MahasiswaUpdate, type Mahasiswa } from '../types';
import { useForm } from 'react-hook-form';

export function useMahasiswaUpdateForm(
	mahasiswa: Mahasiswa,
	onDataUpdate: (data: MahasiswaUpdate) => void | Promise<void>,
) {
	const defaultValues = {
		list_kesukaan: mahasiswa.list_kesukaan ?? [],
		alamat: {
			alamat: mahasiswa.alamat ?? '',
			latitude: mahasiswa.latitude ?? '0',
			longitude: mahasiswa.longitude ?? '0',
		},
		nama: mahasiswa.nama ?? '',
		nim: mahasiswa.nim ?? '',
		no_telepon: mahasiswa.no_telepon ?? '',
		tanggal_lahir: mahasiswa.tanggal_lahir ?? new Date().toISOString(),
	};

	const form = useForm<MahasiswaUpdate>({
		resolver: zodResolver(updateMahasiswaValidator),
		defaultValues,
	});

	const [isEditing, setIsEditing] = React.useState(false);
	const handleEditing = React.useCallback(() => {
		if (isEditing) {
			setIsEditing(false);
			form.reset();
		} else {
			setIsEditing(true);
		}
	}, [form, isEditing]);

	const handleOnDataUpdate = React.useCallback(
		async (data: MahasiswaUpdate) => {
			await onDataUpdate(data);
			setIsEditing(false);
		},
		[onDataUpdate],
	);

	return { mahasiswaForm: form, isEditing, handleEditing, handleOnDataUpdate };
}
