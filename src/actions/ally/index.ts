'use server';

import { z } from 'zod';
import { AllyFormSchema } from '@/lib/interfaces/Ally';
import prisma from '@/lib/db/prisma';

export async function createAlly(form: z.infer<typeof AllyFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.ally.create({
      data: {
        email: form.email,
        name: form.name,
        lastname: form.lastname,
        phoneNumber: form.phoneNumber,
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

export async function updateAlly(form: z.infer<typeof AllyFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.ally.update({
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

export async function deleteAlly(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.ally.delete({
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
