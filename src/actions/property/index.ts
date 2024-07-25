'use server';

import prisma from '@/lib/db/prisma';
// import { Property } from '@prisma/client';
import { z } from 'zod';
import { AdjacencyForm, AttributeForm, EquipmentForm, PropertyFormSchema, UtilityForm } from '@/components/property/admin/PropertyForm';
// import { revalidatePath } from 'next/cache';

// export async function createProperty(): Promise<{ message: string; success: boolean }> {
//   try {
//     const createdProperty = await prisma.property.create({
//       data: {
//         adjacencies: [],
//         attributes: [],
//         distribution: [],
//         equipment: [],
//         documentsInformation: {
//           create: {
//             successionDeclaration: '',
//             attorneyEmail: 'attorney@gmail.com',
//             attorneyPhone: '0412-123123123',
//             attorneyLastName: 'Perez',
//             attorneyFirstName: 'Leo',
//             CIorRIF: false,
//             propertyDoc: false,
//             mainProperty: false,
//             catastralRecordYear: '1998',
//             spouseCIorRIF: false,
//             courtRulings: '',
//             power: '',
//             ownerCIorRIF: false,
//             mortgageRelease: '',
//             isCatastralRecordSameOwner: true,
//             condominiumSolvency: true,
//             condominiumSolvencyDetails: '',
//           },
//         },
//         furnishedAreas: [],
//         owner: null,
//         userId: 'user_2iEwqIEqgujrC8p9nwG7q1sLGpx',
//         generalInformation: {
//           create: {
//             publicationTitle: 'titulo de publicacion',
//             code: 'VINM_001',
//             antiquity: '20',
//             amountOfFloors: '2',
//             description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
//              classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor
//              at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
//              Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
//              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
//             (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
//              ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
//              amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
//              reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
//               by Cicero are also reproduced in their exact original form, accompanied by English versions from the
//                1914 translation by H. Rackham.`,
//             propertyType: 'Casa',
//             footageGround: '23',
//             termsAndConditionsAccepted: false,
//             handoverKeys: true,
//             propertyCondition: 'Mercado Primario',
//             footageBuilding: '34',
//             status: 'Activo',
//             isFurnished: false,
//             propertiesPerFloor: '1',
//             zoning: 'zona',
//             typeOfWork: 'Obra Blanca',
//             isOccupiedByPeople: false,
//           },
//         },
//         locationInformation: {
//           create: {
//             urbanization: 'La campina',
//             amountOfFloors: '1',
//             howToGet:
//               'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making ',
//             avenue: 'Av Bolivar Norte',
//             city: 'Valencia',
//             country: 'Venezuela',
//             state: 'Carabobo',
//             floor: '1',
//             location: 'Centro comercial',
//             buildingNumber: '2',
//             buildingShoppingCenter: '',
//             isClosedStreet: 'Si',
//             tower: 'torre',
//             referencePoint: 'punto de referencia',
//             municipality: 'Naguanagua',
//             street: 'Calle sample',
//             nomenclature: '',
//             parkingNumber: '1',
//             parkingLevel: '2',
//             trunkLevel: '1',
//             trunkNumber: '2',
//           },
//         },
//         negotiationInformation: {
//           create: {
//             client: 'Alex Rodriguez',
//             minimumNegotiation: '20000',
//             price: '24000',
//             partOfPayment: 'Carro, Casa, Negocio',
//             reasonToSellOrRent: 'Viaje',
//             realStateAdviser: 'Pedro martinez',
//             operationType: 'Venta',
//             propertyExclusivity: '30 dias',
//             ownerPaysCommission: 'Si',
//             sellCommission: '20',
//             rentCommission: '5',
//             ally: null,
//             externalAdviser: null,
//             mouthToMouth: false,
//             publicationOnBuilding: false,
//             realStateGroups: false,
//             socialMedia: false,
//             realStateWebPages: false,
//           },
//         },
//         statusHistory: {
//           create: {
//             status: 'Activo',
//             comments: '',
//             username: 'Alex Rodriguez',
//           },
//         },
//         services: {},
//       },
//     });
//     console.log(createdProperty);
//     revalidatePath('/administracion/inmuebles');
//     return {
//       success: true,
//       message: 'Se registro la propiedad con exito.',
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       success: false,
//       message: `Ocurrio un error: ${JSON.stringify(err)}`,
//     };
//   }
// }

export async function createProperty(
  form: z.infer<typeof PropertyFormSchema>,
  images: string[],
): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      attributes,
      equipments,
      utilities,
      locationInformation,
      generalInformation,
      documentsInformation,
      negotiationInformation,
      adjacencies,
    } = form;

    const validAdjacencies = adjacencies.filter((item) => item?.value);
    const validAttributes = attributes.filter((item) => item?.value);
    const validEquipments = equipments.filter((item) => item?.value);
    const validUtilities = utilities.filter((item) => item?.value);

    console.log({
      validUtilities,
      validAdjacencies,
      validAttributes,
      validEquipments,
    });

    const newProperty = await prisma.property.create({
      data: {
        generalInformation: {
          create: {
            status: 'Publicado',
            zoning: generalInformation.zoning ?? '',
            typeOfWork: generalInformation.typeOfWork ?? '',
            propertiesPerFloor: generalInformation.propertiesPerFloor ?? '',
            propertyCondition: generalInformation.propertyCondition ?? '',
            isFurnished: generalInformation.isFurnished ?? false,
            propertyType: generalInformation.propertyType,
            footageBuilding: generalInformation.footageBuilding,
            handoverKeys: generalInformation.handoverKeys ?? false,
            code: generalInformation.code,
            amountOfFloors: generalInformation.amountOfFloors ?? '',
            isOccupiedByPeople: generalInformation.isOccupiedByPeople ?? false,
            footageGround: generalInformation.footageGround,
            description: generalInformation.description,
            antiquity: generalInformation.antiquity ?? '',
            termsAndConditionsAccepted: generalInformation.termsAndConditionsAccepted ?? false,
            publicationTitle: generalInformation.publicationTitle,
          },
        },
        locationInformation: {
          create: {
            municipality: locationInformation.municipality ?? '',
            state: locationInformation.state,
            location: locationInformation.location ?? '',
            parkingNumber: locationInformation.parkingNumber ?? '',
            isClosedStreet: locationInformation.isClosedStreet ?? 'No',
            trunkLevel: locationInformation.trunkLevel ?? '',
            amountOfFloors: locationInformation.amountOfFloors ?? '',
            street: locationInformation.street ?? '',
            parkingLevel: locationInformation.parkingLevel ?? '',
            tower: locationInformation.tower ?? '',
            nomenclature: locationInformation.nomenclature ?? '',
            howToGet: locationInformation.howToGet ?? '',
            country: locationInformation.country,
            trunkNumber: locationInformation.trunkNumber ?? '',
            avenue: locationInformation.avenue ?? '',
            floor: locationInformation.floor ?? '',
            city: locationInformation.city,
            referencePoint: locationInformation.referencePoint ?? '',
            buildingShoppingCenter: locationInformation.buildingShoppingCenter ?? '',
            buildingNumber: locationInformation.buildingNumber ?? '',
            urbanization: locationInformation.urbanization ?? '',
          },
        },
        negotiationInformation: {
          create: {
            client: negotiationInformation.client ?? '',
            externalAdviser: negotiationInformation.externalAdviser,
            realStateWebPages: negotiationInformation.realStateWebPages ?? false,
            realStateGroups: negotiationInformation.realStateGroups ?? false,
            socialMedia: negotiationInformation.socialMedia ?? false,
            publicationOnBuilding: negotiationInformation.publicationOnBuilding ?? false,
            price: negotiationInformation.price,
            reasonToSellOrRent: negotiationInformation.reasonToSellOrRent ?? '',
            mouthToMouth: negotiationInformation.mouthToMouth ?? false,
            ally: negotiationInformation.ally ?? '',
            propertyExclusivity: negotiationInformation.propertyExclusivity,
            minimumNegotiation: negotiationInformation.minimumNegotiation ?? '',
            operationType: negotiationInformation.operationType,
            partOfPayment: negotiationInformation.partOfPayment ?? '',
            sellCommission: negotiationInformation.sellCommission ?? '',
            ownerPaysCommission: negotiationInformation.ownerPaysCommission ?? '',
            realStateAdviser: negotiationInformation.realStateAdviser ?? '',
            rentCommission: negotiationInformation.rentCommission ?? '',
          },
        },
        statusHistory: {
          create: {
            status: 'created',
            username: 'admin@gmail.com',
            comments: '',
          },
        },
        furnishedAreas: [],
        documentsInformation: {
          create: {
            power: documentsInformation.power ?? '',
            ownerCIorRIF: documentsInformation.ownerCIorRIF ?? false,
            propertyDoc: documentsInformation.propertyDoc ?? false,
            mainProperty: documentsInformation.mainProperty ?? false,
            courtRulings: documentsInformation.courtRulings ?? '',
            attorneyEmail: documentsInformation.attorneyEmail ?? '',
            condominiumSolvencyDetails: documentsInformation.condominiumSolvencyDetails ?? '',
            condominiumSolvency: documentsInformation.condominiumSolvency ?? false,
            catastralRecordYear: documentsInformation.catastralRecordYear ?? '',
            CIorRIF: documentsInformation.CIorRIF ?? false,
            mortgageRelease: documentsInformation.mortgageRelease ?? '',
            isCatastralRecordSameOwner: documentsInformation.isCatastralRecordSameOwner ?? false,
            spouseCIorRIF: documentsInformation.spouseCIorRIF ?? false,
            attorneyFirstName: documentsInformation.attorneyFirstName ?? '',
            attorneyLastName: documentsInformation.attorneyLastName ?? '',
            attorneyPhone: documentsInformation.attorneyPhone ?? '',
            successionDeclaration: documentsInformation.successionDeclaration ?? '',
          },
        },
        images,
        distribution: [],
        AdjacenciesOnProperties: {
          create: validAdjacencies.map((adjacency) => {
            const { adjacencyId } = adjacency as AdjacencyForm;
            return {
              adjacency: {
                connect: {
                  id: adjacencyId,
                },
              },
            };
          }),
        },
        AttributesOnProperties: {
          create: validAttributes.map((attribute) => {
            const { value, attributeId, valueType } = attribute as AttributeForm;
            return {
              value: valueType !== 'text' ? String(value) : value,
              attribute: {
                connect: {
                  id: attributeId,
                },
              },
            };
          }),
        },
        EquipmentsOnProperties: {
          create: validEquipments.map((equipment) => {
            const { equipmentId, brand, additionalInformation } = equipment as EquipmentForm;
            return {
              brand,
              additionalInformation,
              equipment: {
                connect: {
                  id: equipmentId,
                },
              },
            };
          }),
        },
        UtilitiesOnProperties: {
          create: validUtilities.map((utility) => {
            const { utilityId, additionalInformation } = utility as UtilityForm;
            return {
              additionalInformation,
              utility: {
                connect: {
                  id: utilityId,
                },
              },
            };
          }),
        },
        userId: 'admin@gmail.com',
      },
    });

    console.log(newProperty);
    return { success: true, error: undefined };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}
