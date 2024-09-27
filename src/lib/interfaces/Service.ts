import { z } from 'zod';

export const ServiceFormSchema = z.object({
  title: z.string({ required_error: 'Este campo es requerido' }),
  id: z.number(),
});

export const SubServiceFormSchema = z.object({
  service: z.string({ required_error: 'Este campo es requerido' }),
  parentId: z.number({ required_error: 'Este campo es requerido' }),
  id: z.number(),
});
