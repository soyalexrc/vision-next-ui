'use server';

import prisma from '@/lib/db/prisma';
import { Property } from '@prisma/client';

export async function createProperty(): Promise<{ message: string; success: boolean }> {
  try {
    const createdProperty = await prisma.property.create({
      data: {
        images: [
          'https://firebasestorage.googleapis.com/v0/b/vision-inmobiliaria-636c6.appspot.com/o/Servicio%20Administrativo%2Fen%20curso%2FIMG_614C6961F70C-1.jpeg?alt=media&token=95b3f0e6-7ac4-4e0d-8d6e-8b388c716de1',
        ],
        files: [''],
    // {
    //   name: 'MI CLARO WEB - MAPA DE CONSUMO DE DATA DE SERVICIOS (2) (1) (1).xlsx',
    //       url: 'https://firebasestorage.googleapis.com/v0/b/vision-inmobiliaria-636c6.appspot.com/o/Servicio%20Administrativo%2Fen%20curso%2FMI%20CLARO%20WEB%20-%20MAPA%20DE%20CONSUMO%20DE%20DATA%20DE%20SERVICIOS%20(2)%20(1)%20(1).xlsx?alt=media&token=27d6a529-dc8c-441c-9684-f3c46868736f',
    // },
        ally: null,
        client: null,
        adjacencies: [],
        attributes: [],
        distribution: [],
        equipment: [],
        documentsInformation: {},
        furnishedAreas: [],
        owner: null,
        externalAdviser: null,
        userId: 'user_2iEwqIEqgujrC8p9nwG7q1sLGpx',
        generalInformation: {},
        locationInformation: {},
        negotiationInformation: {},
        statusHistory: {},
        services: {},
        publicationTitle: '',
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
        statusHistory: true,
        negotiationInformation: true,
      },
    });
  } catch (err) {
    console.log(err);
    return [];
  }
}
