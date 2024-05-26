import { z } from 'zod';
import { Alamat } from '~/types';

export const alamatValidator: z.ZodType<Alamat> = z.object({
	alamat: z.string(),
	latitude: z.string(),
	longitude: z.string(),
});
