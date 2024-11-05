'use server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { Adjacency } from '@prisma/client';
import { AdjacencyFormSchema } from '@/lib/interfaces/Adjacency';

export async function createAdjacency(
  form: z.infer<typeof AdjacencyFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Adjacency }> {
  try {
    const newAdjacency = await prisma.adjacency.create({
      data: {
        title: form.title,
        description: form.description,
      },
    });
    return { success: true, error: '', data: newAdjacency };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function updateAdjacency(
  form: z.infer<typeof AdjacencyFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Adjacency }> {
  try {
    const adjacency = await prisma.adjacency.update({
      where: {
        id: form.id,
      },
      data: { title: form.title, description: form.description },
    });
    return { success: true, error: '', data: adjacency };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function deleteAdjacency(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.adjacency.delete({
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
