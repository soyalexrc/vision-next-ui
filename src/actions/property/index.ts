'use server';

import prisma from '@/lib/db/prisma';
import { z } from 'zod';
import slugify from 'slugify';
import { AdjacencyForm, AttributeForm, EquipmentForm, PropertyFormSchema, UtilityForm } from '@/lib/interfaces/property/PropertyForm';
// import { revalidatePath } from 'next/cache';

export async function createUpdateProperty(
  form: z.infer<typeof PropertyFormSchema>,
  images: string[],
  update: boolean,
  id: string
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

    let property;

    console.log(form);

    if (update) {
      await prisma.attributesOnProperties.deleteMany({
        where: { propertyId: id }
      })
      await prisma.utilitiesOnProperties.deleteMany({
        where: { propertyId: id }
      })
      await prisma.equipmentsOnProperties.deleteMany({
        where: { propertyId: id }
      })
      await prisma.adjacenciesOnProperties.deleteMany({
        where: { propertyId: id }
      })
      property = await prisma.property.update({
        where: { id },
        data: {
          generalInformation: {
            update: {
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
            update: {
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
            update: {
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
          documentsInformation: {
            update: {
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
          AdjacenciesOnProperties: {
            create: validAdjacencies.map((adjacency: any) => {
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
            create: validAttributes.map((attribute: any) => {
              const { value, attributeId } = attribute as AttributeForm;
              return {
                value: typeof value !== 'string' ? String(value) : value,
                attribute: {
                  connect: {
                    id: attributeId,
                  },
                },
              };
            }),
          },
          EquipmentsOnProperties: {
            create: validEquipments.map((equipment: any) => {
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
            create: validUtilities.map((utility: any) => {
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
        }
      })
    } else {
      property = await prisma.property.create({
        data: {
          slug: slugify(generalInformation.publicationTitle, {
            lower: true,
            trim: true,
            replacement: '-',
          }),
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
          furnishedAreas: [],
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
              const { value, attributeId } = attribute as AttributeForm;
              return {
                value: typeof value !== 'string' ? String(value) : value,
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
    }

    console.log(property);
    return { success: true, error: undefined };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}
