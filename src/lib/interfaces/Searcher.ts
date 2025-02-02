import { z } from 'zod';

export const SearcherFormSchema = z.object({
  codigo: z.string().optional().nullable(),
  estado: z.string().optional().nullable(),
  municipio: z.string().optional().nullable(),
  propertyType: z.string().optional().nullable(),
  operationType: z.string().optional().nullable(),
});
