import { z } from 'zod';

export const idValidator = z.number().gt(0);
