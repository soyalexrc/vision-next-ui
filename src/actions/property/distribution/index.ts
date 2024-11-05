'use server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { Distribution } from '@prisma/client';
import { DistributionFormSchema } from '@/lib/interfaces/Distribution';

export async function createDistribution(
  form: z.infer<typeof DistributionFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Distribution }> {
  try {
    const newDistribution = await prisma.distribution.create({
      data: {
        title: form.title,
        description: form.description,
      },
    });
    return { success: true, error: '', data: newDistribution };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function updateDistribution(
  form: z.infer<typeof DistributionFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Distribution }> {
  try {
    const distribution = await prisma.distribution.update({
      where: {
        id: form.id,
      },
      data: { title: form.title, description: form.description },
    });
    return { success: true, error: '', data: distribution };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function deleteDistribution(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.distribution.delete({
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
