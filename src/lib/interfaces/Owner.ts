import { z } from 'zod';

export const OwnersFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Minimo 3 caracteres'),
  lastname: z.string().min(3, 'Minimo 3 caracteres'),
  phoneNumber: z.string().min(9),
  isInvestor: z.boolean(),
  email: z.string().email({ message: 'Email invalido' }),
});
