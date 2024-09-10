import { z } from 'zod';

export const ExternalAdviserFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Minimo 3 caracteres'),
  lastname: z.string().min(3, 'Minimo 3 caracteres'),
  phoneNumber: z.string().min(9),
  realStateCompanyName: z.string().min(3),
  email: z.string().email({ message: 'Email invalido' }),
});
