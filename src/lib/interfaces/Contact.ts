import { z } from 'zod';

export const ContactFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Minimo 3 caracteres'),
  from: z.string().optional(),
  message: z.string(),
  phone: z.string().min(9),
  email: z.string().email({ message: 'Email invalido' }),
});
