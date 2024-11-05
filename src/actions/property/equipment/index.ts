'use server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { EquipmentFormSchema } from '@/lib/interfaces/Equipment';
import { Equipment } from '@prisma/client';

export async function createEquipment(
  form: z.infer<typeof EquipmentFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Equipment }> {
  try {
    const newEquipment = await prisma.equipment.create({
      data: {
        title: form.title,
        description: form.description,
      },
    });
    return { success: true, error: '', data: newEquipment };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function updateEquipment(
  form: z.infer<typeof EquipmentFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Equipment }> {
  try {
    const equipment = await prisma.equipment.update({
      where: {
        id: form.id,
      },
      data: { title: form.title, description: form.description },
    });
    return { success: true, error: '', data: equipment };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function deleteEquipment(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.equipment.delete({
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
