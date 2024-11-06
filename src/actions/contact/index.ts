'use server';
import prisma from '@/lib/db/prisma';
import { z } from 'zod';
import { ContactFormSchema } from '@/lib/interfaces/Contact';
import {WorkWithUsFormSchema} from "@/lib/interfaces/WorkWithUs";

export async function sendContactForm(form: z.infer<typeof ContactFormSchema>): Promise<{ error?: string; success: boolean }> {
  try {
    await prisma.contactForm.create({
      data: {
        ...form,
        from: form.from!,
      },
    });
    return {
      success: true,
      error: undefined,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: JSON.stringify(err),
    };
  }
}

export async function sendWorkWithUsForm(form: z.infer<typeof WorkWithUsFormSchema>): Promise<{ error?: string; success: boolean }> {
  try {
    await prisma.workWithUsForm.create({
      data: form,
    });
    return {
      success: true,
      error: undefined,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: JSON.stringify(err),
    };
  }
}
