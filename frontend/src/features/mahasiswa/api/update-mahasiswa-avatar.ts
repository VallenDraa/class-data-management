import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api-client';
import { MAHASISWA_QUERY_KEY } from '../constants';
import { GetMahasiswaSearchParams } from '../types';

export function getFileBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
}

export async function editMahasiswaAvatar({ image }: { image: string }) {
	const response = await api.post('/mahasiswa/foto-profile', {
		foto_profile: image,
	});

	return response;
}

export function useUpdateMahasiswaAvatar(
	id: number,
	searchParams: GetMahasiswaSearchParams,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editMahasiswaAvatar,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, id],
			});

			await queryClient.invalidateQueries({
				queryKey: [MAHASISWA_QUERY_KEY, searchParams],
			});
		},
	});
}
