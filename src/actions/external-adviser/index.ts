'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { ExternalAdviserFormSchema } from '@/lib/interfaces/ExternalAdviser';

export async function createExternalAdviser(
  form: z.infer<typeof ExternalAdviserFormSchema>,
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.externalAdviser.create({
      data: {
        email: form.email,
        name: form.name,
        lastname: form.lastname,
        phoneNumber: form.phoneNumber,
        realStateCompanyName: form.realStateCompanyName,
      },
    });
    return { success: true, error: '' };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function updateExternalAdviser(
  form: z.infer<typeof ExternalAdviserFormSchema>,
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.externalAdviser.update({
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

export async function deleteExternalAdviser(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.externalAdviser.delete({
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