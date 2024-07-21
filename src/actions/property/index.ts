'use server';

import prisma from '@/lib/db/prisma';
import { Property } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createProperty(): Promise<{ message: string; success: boolean }> {
  try {
    const createdProperty = await prisma.property.create({
      data: {
        adjacencies: [],
        attributes: [],
        distribution: [],
        equipment: [],
        documentsInformation: {
          create: {
            successionDeclaration: '',
            attorneyEmail: 'attorney@gmail.com',
            attorneyPhone: '0412-123123123',
            attorneyLastName: 'Perez',
            attorneyFirstName: 'Leo',
            CIorRIF: false,
            propertyDoc: false,
            mainProperty: false,
            catastralRecordYear: '1998',
            spouseCIorRIF: false,
            courtRulings: '',
            power: '',
            ownerCIorRIF: false,
            mortgageRelease: '',
            isCatastralRecordSameOwner: true,
            condominiumSolvency: true,
            condominiumSolvencyDetails: '',
          },
        },
        furnishedAreas: [],
        owner: null,
        userId: 'user_2iEwqIEqgujrC8p9nwG7q1sLGpx',
        generalInformation: {
          create: {
            publicationTitle: 'titulo de publicacion',
            code: 'VINM_001',
            antiquity: '20',
            amountOfFloors: '2',
            description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
             classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor 
             at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a 
             Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the 
             undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
             ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit 
             amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is 
             reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form, accompanied by English versions from the
               1914 translation by H. Rackham.`,
            propertyType: 'Casa',
            footageGround: '23',
            termsAndConditionsAccepted: false,
            handoverKeys: true,
            propertyCondition: 'Mercado Primario',
            footageBuilding: '34',
            status: 'Activo',
            isFurnished: false,
            propertiesPerFloor: '1',
            zoning: 'zona',
            typeOfWork: 'Obra Blanca',
            isOccupiedByPeople: false,
          },
        },
        locationInformation: {
          create: {
            urbanization: 'La campina',
            amountOfFloors: '1',
            howToGet:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making ',
            avenue: 'Av Bolivar Norte',
            city: 'Valencia',
            country: 'Venezuela',
            state: 'Carabobo',
            floor: '1',
            location: 'Centro comercial',
            buildingNumber: '2',
            buildingShoppingCenter: '',
            isClosedStreet: 'Si',
            tower: 'torre',
            referencePoint: 'punto de referencia',
            municipality: 'Naguanagua',
            street: 'Calle sample',
            nomenclature: '',
            parkingNumber: '1',
            parkingLevel: '2',
            trunkLevel: '1',
            trunkNumber: '2',
          },
        },
        negotiationInformation: {
          create: {
            client: 'Alex Rodriguez',
            minimumNegotiation: '20000',
            price: '24000',
            partOfPayment: 'Carro, Casa, Negocio',
            reasonToSellOrRent: 'Viaje',
            realStateAdviser: 'Pedro martinez',
            operationType: 'Venta',
            propertyExclusivity: '30 dias',
            ownerPaysCommission: 'Si',
            sellCommission: '20',
            rentCommission: '5',
            ally: null,
            externalAdviser: null,
            mouthToMouth: false,
            publicationOnBuilding: false,
            realStateGroups: false,
            socialMedia: false,
            realStateWebPages: false,
          },
        },
        statusHistory: {
          create: {
            status: 'Activo',
            comments: '',
            username: 'Alex Rodriguez',
          },
        },
        services: {},
      },
    });
    console.log(createdProperty);
    revalidatePath('/administracion/inmuebles');
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

export async function getNewVinmId(): Promise<string> {
  try {
    let newVinmId: string = '';
    const amountOfProperties = await prisma.property.count();
    switch (String(amountOfProperties + 1).length) {
      case 1:
        newVinmId = `VINM_00${amountOfProperties + 1}`;
        break;
      case 2:
        newVinmId = `VINM_0${amountOfProperties + 1}`;
        break;
      case 3:
        newVinmId = `VINM_${amountOfProperties + 1}`;
        break;
    }
    return newVinmId;
  } catch (err) {
    console.log(err);
    return `Ocurrio un error: ${JSON.stringify(err)}`;
  }
}
