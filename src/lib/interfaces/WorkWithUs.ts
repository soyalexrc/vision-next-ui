import { z } from 'zod';

export const WorkWithUsFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Minimo 3 caracteres'),
  message: z.string(),
  role: z.string(),
  office: z.string(),
  cvUrl: z.string(),
  phone: z.string().min(9),
  email: z.string().email({ message: 'Email invalido' }),
});
