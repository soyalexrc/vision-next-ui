'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { ClientFormSchema } from '@/lib/interfaces/Client';

export async function createClient(form: z.infer<typeof ClientFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    // @ts-ignore
    await prisma.client.create({ data: { ...form } });
    return { success: true, error: '' };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function updateClient(form: z.infer<typeof ClientFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.client.update({
      where: {
        id: form.id,
      },
      data: { ...form },
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function deleteClient(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.client.delete({
      where: {
        id,
      },
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}
