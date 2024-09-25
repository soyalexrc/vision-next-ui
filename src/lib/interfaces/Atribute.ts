import { z } from 'zod';

export const AttributeFormSchema = z.object({
  label: z.string({ required_error: 'Este campo es requerido' }),
  placeholder: z.string().optional(),
  options: z.string().optional(),
  formType: z.string({ required_error: 'Este campo es requerido' }),
  id: z.number(),
});
