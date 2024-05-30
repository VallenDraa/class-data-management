import { z } from 'zod';
import { Alamat } from '~/types';

export const alamatValidator: z.ZodType<Alamat> = z.object({
	alamat: z.string().min(1, 'Alamat tidak boleh kosong!'),
	latitude: z.string().min(1, 'Latitude tidak boleh kosong!'),
	longitude: z.string().min(1, 'Longitude tidak boleh kosong!'),
});
