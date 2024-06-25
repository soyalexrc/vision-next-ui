'use server';

import prisma from '@/lib/db/prisma';
import { Property } from '@prisma/client';

export async function createProperty(): Promise<{ message: string; success: boolean }> {
  try {
    const createdProperty = await prisma.property.create({
      data: {
        images: [],
        files: [],
        ally: null,
        client: null,
        adjacencies: [],
        attributes: [],
        distribution: [],
        equipment: [],
        documentsInformation: {},
        furnishedAread: '',
        owner: null,
        externalAdviser: null,
        userId: '',
        generalInformation: {},
        locationInformation: {},
        negotiationInformation: {},
        statusHistory: '',
        PropertyStatusEntry: {},
        services: {},
        pubicationTitle: '',
      },
    });
    console.log(createdProperty);
    return {
      success: true,
      message: 'Se registro la propiedad con exito.',
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: `Ocurrio un error: ${JSON.stringify(err)}`,
    };
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    return prisma.property.findMany({
      include: {
        services: true,
        documentsInformation: true,
        generalInformation: true,
        locationInformation: true,
        PropertyStatusEntry: true,
        negotiationInformation: true,
      }
    });
  } catch (err) {
    console.log(err);
    return [];
  }
}
