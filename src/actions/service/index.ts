'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { ServiceFormSchema, SubServiceFormSchema } from '@/lib/interfaces/Service';
import { Service, SubService } from '@prisma/client';

export async function getServices(): Promise<{ success: boolean; error?: string; data: Service[] }> {
  try {
    const data = await prisma.service.findMany({
      orderBy: {
        title: 'asc',
      },
    });
    return { success: true, error: '', data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Ocurrio un error al cargar los servicios, intentelo de nuevo. ' + JSON.stringify(error),
      data: [],
    };
  }
}

export async function getSubServices(parentId: number): Promise<{ success: boolean; error?: string; data: SubService[] }> {
  try {
    const data = await prisma.subService.findMany({
      where: {
        serviceId: parentId,
      },
      orderBy: {
        service: 'asc',
      },
    });
    return { success: true, error: '', data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Ocurrio un error al cargar las operaciones, intentelo de nuevo. ' + JSON.stringify(error),
      data: [],
    };
  }
}

export async function createService(form: z.infer<typeof ServiceFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.create({
      data: {
        title: form.title,
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

export async function updateService(form: z.infer<typeof ServiceFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.update({
      where: {
        id: form.id,
      },
      data: { title: form.title },
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function deleteService(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.delete({
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

export async function createSubService(form: z.infer<typeof SubServiceFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.subService.create({
      data: {
        service: form.service,
        serviceId: form.parentId,
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

export async function updateSubService(form: z.infer<typeof SubServiceFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.subService.update({
      where: {
        id: form.id,
      },
      data: { service: form.service },
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function deleteSubService(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.subService.delete({
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
