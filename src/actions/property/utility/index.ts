'use server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { Utility } from '@prisma/client';
import { UtilityFormSchema } from '@/lib/interfaces/Utility';

export async function createUtility(
  form: z.infer<typeof UtilityFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Utility }> {
  try {
    const newUtility = await prisma.utility.create({
      data: {
        title: form.title,
        description: form.description,
      },
    });
    return { success: true, error: '', data: newUtility };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function updateUtility(
  form: z.infer<typeof UtilityFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Utility }> {
  try {
    const utility = await prisma.utility.update({
      where: {
        id: form.id,
      },
      data: { title: form.title, description: form.description },
    });
    return { success: true, error: '', data: utility };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function deleteUtility(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.utility.delete({
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
