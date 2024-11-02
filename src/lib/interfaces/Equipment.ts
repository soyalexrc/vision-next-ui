import { z } from 'zod';

export const EquipmentFormSchema = z.object({
  title: z.string({ required_error: 'Este campo es requerido' }),
  description: z.string().optional(),
  id: z.number(),
});