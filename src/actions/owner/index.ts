'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { OwnersFormSchema } from '@/lib/interfaces/Owner';

export async function createOwner(form: z.infer<typeof OwnersFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.owner.create({
      data: {
        email: form.email,
        name: form.name,
        lastname: form.lastname,
        phoneNumber: form.phoneNumber,
        isInvestor: form.isInvestor,
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

export async function updateOwner(form: z.infer<typeof OwnersFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.owner.update({
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

export async function deleteOwner(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.owner.delete({
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
