'use server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { Attribute, FormTypes } from '@prisma/client';
import { AttributeFormSchema } from '@/lib/interfaces/Atribute';

export async function createAttribute(
  form: z.infer<typeof AttributeFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Attribute }> {
  try {
    const newAttribute = await prisma.attribute.create({
      data: {
        label: form.label,
        formType: form.formType as FormTypes,
        options: form.options,
        placeholder: form.placeholder,
      },
    });
    return { success: true, error: '', data: newAttribute };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function updateAttribute(
  form: z.infer<typeof AttributeFormSchema>,
): Promise<{ success: boolean; error?: string; data?: Attribute }> {
  try {
    const attribute = await prisma.attribute.update({
      where: {
        id: form.id,
      },
      data: {
        label: form.label,
        formType: form.formType as FormTypes,
        options: form.options,
        placeholder: form.placeholder,
      },
    });
    return { success: true, error: '', data: attribute };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
      data: undefined,
    };
  }
}

export async function deleteAttribute(id: number): Promise<{ success: boolean; error?: string }> {
  console.log(id);
  try {
    await prisma.attribute.delete({
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
