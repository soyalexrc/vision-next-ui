import { z } from 'zod';

export const AdjacencyFormSchema = z.object({
  title: z.string({ required_error: 'Este campo es requerido' }),
  description: z.string().optional(),
  id: z.number(),
});
