'use server';

import { z } from 'zod';
import { AllyFormSchema } from '@/lib/interfaces/Ally';
import prisma from '@/lib/db/prisma';
import { Ally } from '@prisma/client';

export async function getAllies(): Promise<{ error?: string; data: Ally[] | undefined }> {
  try {
    const data = await prisma.ally.findMany();
    console.log(data);
    return {
      data,
      error: undefined,
    };
  } catch (err) {
    console.error(err);
    return {
      data: undefined,
      error: JSON.stringify(err),
    };
  }
}

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
