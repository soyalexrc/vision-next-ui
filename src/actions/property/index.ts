'use server';

import prisma from '@/lib/db/prisma';
import { z } from 'zod';
import slugify from 'slugify';
import {
  AdjacencyForm,
  AttributeForm,
  DistributionForm,
  EquipmentForm,
  PropertyFormSchema,
  UtilityForm,
} from '@/lib/interfaces/property/PropertyForm';
import { revalidatePath } from 'next/cache';
import { deleteObject, listAll, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { v4 as uuid } from 'uuid';

async function removeFolder(fullPath: string) {
  try {
    const folderRef = ref(storage, fullPath);
    const listResult = await listAll(folderRef);
    if (listResult.prefixes.length > 0) {
      const nestedFolderRef = ref(storage, listResult.prefixes[0].fullPath);
      const nestedListResult = await listAll(nestedFolderRef);
      for (const file of nestedListResult.items) {
        await deleteObject(ref(storage, file.fullPath));
      }
      await removeFolder(fullPath);
    } else {
      for (const file of listResult.items) {
        await deleteObject(ref(storage, file.fullPath));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export async function toggleFeatured(id: string, currentValue: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.property.update({
      data: {
        isFeatured: !currentValue,
      },
      where: { id },
    });

    return {
      success: true,
      error: undefined,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}

export async function deleteProperty(id: string, imagesPaths: string[], code: string): Promise<{ success: boolean; error?: string }> {
  try {
    // eliminamos las tablas relacion
    await prisma.generalInformation.delete({ where: { propertyId: id } });
    await prisma.locationInformation.delete({ where: { propertyId: id } });
    await prisma.documentsInformation.delete({ where: { propertyId: id } });
    await prisma.negotiationInfomation.delete({ where: { propertyId: id } });
    await prisma.propertyStatusEntry.delete({ where: { propertyId: id } });
    await prisma.attributesOnProperties.deleteMany({ where: { propertyId: id } });
    await prisma.adjacenciesOnProperties.deleteMany({ where: { propertyId: id } });
    await prisma.distributionsOnProperties.deleteMany({ where: { propertyId: id } });
    await prisma.utilitiesOnProperties.deleteMany({ where: { propertyId: id } });
    await prisma.equipmentsOnProperties.deleteMany({ where: { propertyId: id } });
    const index = imagesPaths[0].indexOf(code);
    const fullPath = imagesPaths[0].slice(0, index).concat(code);
    await removeFolder(fullPath);

    // Eliminamos la fila de property

    await prisma.property.delete({ where: { id } });

    return {
      success: true,
      error: undefined,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}

export async function createUpdateProperty(
  form: { dataForm: z.infer<typeof PropertyFormSchema>; userId: string },
  images: string[],
  update: boolean,
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const formPayload = form.dataForm;
  if (images.length < 1) {
    return {
      success: false,
      error: 'Deben agregarse imagenes para la propiedad',
    };
  }

  if (isNaN(Number(formPayload.negotiationInformation.price))) {
    return {
      success: false,
      error: `Ingresa un valor de precio correcto. Valor ingresado: $${formPayload.negotiationInformation.price}`,
    };
  }

  try {
    const {
      attributes,
      equipments,
      distributions,
      utilities,
      locationInformation,
      generalInformation,
      documentsInformation,
      negotiationInformation,
      adjacencies,
    } = formPayload;

    const validAdjacencies = adjacencies.filter((item) => item?.value);
    const validAttributes = attributes.filter((item) => item?.value);
    const validEquipments = equipments.filter((item) => item?.value);
    const validUtilities = utilities.filter((item) => item?.value);
    const validDistributions = distributions.filter((item) => item?.value);

    if (update) {
      await prisma.attributesOnProperties.deleteMany({
        where: { propertyId: id },
      });
      await prisma.utilitiesOnProperties.deleteMany({
        where: { propertyId: id },
      });
      await prisma.equipmentsOnProperties.deleteMany({
        where: { propertyId: id },
      });
      await prisma.adjacenciesOnProperties.deleteMany({
        where: { propertyId: id },
      });
      await prisma.distributionsOnProperties.deleteMany({
        where: { propertyId: id },
      });
      const property = await prisma.property.update({
        where: { id },
        data: {
          GeneralInformation: {
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
          LocationInformation: {
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
              city: locationInformation.city ?? '',
              referencePoint: locationInformation.referencePoint ?? '',
              buildingShoppingCenter: locationInformation.buildingShoppingCenter ?? '',
              buildingNumber: locationInformation.buildingNumber ?? '',
              urbanization: locationInformation.urbanization ?? '',
            },
          },
          NegotiationInfomation: {
            update: {
              client: negotiationInformation.client ?? '',
              externalAdviser: negotiationInformation.externalAdviser ?? '',
              externaladvisername: negotiationInformation.externaladvisername ?? '',
              realStateWebPages: negotiationInformation.realStateWebPages ?? false,
              realStateGroups: negotiationInformation.realStateGroups ?? false,
              socialMedia: negotiationInformation.socialMedia ?? false,
              publicationOnBuilding: negotiationInformation.publicationOnBuilding ?? false,
              price: negotiationInformation.price,
              additional_price: negotiationInformation.additional_price ?? '',
              reasonToSellOrRent: negotiationInformation.reasonToSellOrRent ?? '',
              mouthToMouth: negotiationInformation.mouthToMouth ?? false,
              ally: negotiationInformation.ally ?? '',
              allyname: negotiationInformation.allyname ?? '',
              propertyExclusivity: negotiationInformation.propertyExclusivity,
              minimumNegotiation: negotiationInformation.minimumNegotiation ?? '',
              operationType: negotiationInformation.operationType,
              partOfPayment: negotiationInformation.partOfPayment ?? '',
              sellCommission: negotiationInformation.sellCommission ?? '',
              ownerPaysCommission: negotiationInformation.ownerPaysCommission ?? '',
              realStateAdviser: negotiationInformation.realStateAdviser ?? '',
              realstateadvisername: negotiationInformation.realstateadvisername ?? '',
              rentCommission: negotiationInformation.rentCommission ?? '',
            },
          },
          DocumentsInformation: {
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
              realStateTax: documentsInformation.realStateTax ?? '',
              owner: documentsInformation.owner ?? '',
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
                Adjacency: {
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
                Attribute: {
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
                Equipment: {
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
                Utility: {
                  connect: {
                    id: utilityId,
                  },
                },
              };
            }),
          },
          DistributionsOnProperties: {
            create: validDistributions.map((distribution: any) => {
              const { distributionId, additionalInformation } = distribution as DistributionForm;
              return {
                additionalInformation,
                Distribution: {
                  connect: {
                    id: distributionId,
                  },
                },
              };
            }),
          },
          userId: form.userId,
        },
      });
      revalidatePath(`/inmuebles/${property.slug}`);
    } else {
      await prisma.property.create({
        data: {
          updatedAt: new Date(),
          slug: slugify(generalInformation.publicationTitle, {
            lower: true,
            trim: true,
            replacement: '-',
          }),
          GeneralInformation: {
            create: {
              id: uuid(),
              status: 'Publicado',
              zoning: generalInformation.zoning ?? '',
              typeOfWork: generalInformation.typeOfWork ?? '',
              propertiesPerFloor: generalInformation.propertiesPerFloor ?? '',
              propertyCondition: generalInformation.propertyCondition ?? '',
              isFurnished: generalInformation.isFurnished ?? false,
              propertyType: generalInformation.propertyType,
              footageBuilding: generalInformation.footageBuilding ?? '',
              handoverKeys: generalInformation.handoverKeys ?? false,
              code: generalInformation.code,
              amountOfFloors: generalInformation.amountOfFloors ?? '',
              isOccupiedByPeople: generalInformation.isOccupiedByPeople ?? false,
              footageGround: generalInformation.footageGround ?? '',
              description: generalInformation.description,
              antiquity: generalInformation.antiquity ?? '',
              termsAndConditionsAccepted: generalInformation.termsAndConditionsAccepted ?? false,
              publicationTitle: generalInformation.publicationTitle,
            },
          },
          LocationInformation: {
            create: {
              id: uuid(),
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
              city: locationInformation.city ?? '',
              referencePoint: locationInformation.referencePoint ?? '',
              buildingShoppingCenter: locationInformation.buildingShoppingCenter ?? '',
              buildingNumber: locationInformation.buildingNumber ?? '',
              urbanization: locationInformation.urbanization ?? '',
            },
          },
          NegotiationInfomation: {
            create: {
              id: uuid(),
              client: negotiationInformation.client ?? '',
              externalAdviser: negotiationInformation.externalAdviser ?? '',
              externaladvisername: negotiationInformation.externaladvisername ?? '',
              realStateWebPages: negotiationInformation.realStateWebPages ?? false,
              realStateGroups: negotiationInformation.realStateGroups ?? false,
              socialMedia: negotiationInformation.socialMedia ?? false,
              publicationOnBuilding: negotiationInformation.publicationOnBuilding ?? false,
              price: negotiationInformation.price,
              additional_price: negotiationInformation.additional_price ?? '',
              reasonToSellOrRent: negotiationInformation.reasonToSellOrRent ?? '',
              mouthToMouth: negotiationInformation.mouthToMouth ?? false,
              ally: negotiationInformation.ally ?? '',
              allyname: negotiationInformation.allyname ?? '',
              propertyExclusivity: negotiationInformation.propertyExclusivity ?? '',
              minimumNegotiation: negotiationInformation.minimumNegotiation ?? '',
              operationType: negotiationInformation.operationType,
              partOfPayment: negotiationInformation.partOfPayment ?? '',
              sellCommission: negotiationInformation.sellCommission ?? '',
              ownerPaysCommission: negotiationInformation.ownerPaysCommission ?? '',
              realStateAdviser: negotiationInformation.realStateAdviser ?? '',
              realstateadvisername: negotiationInformation.realstateadvisername ?? '',
              rentCommission: negotiationInformation.rentCommission ?? '',
            },
          },
          PropertyStatusEntry: {
            create: {
              id: uuid(),
              status: 'created',
              username: form.userId,
              comments: '',
            },
          },
          DocumentsInformation: {
            create: {
              id: uuid(),
              power: documentsInformation.power ?? '',
              ownerCIorRIF: documentsInformation.ownerCIorRIF ?? false,
              propertyDoc: documentsInformation.propertyDoc ?? false,
              mainProperty: documentsInformation.mainProperty ?? false,
              courtRulings: documentsInformation.courtRulings ?? '',
              attorneyEmail: documentsInformation.attorneyEmail ?? '',
              condominiumSolvencyDetails: documentsInformation.condominiumSolvencyDetails ?? '',
              condominiumSolvency: documentsInformation.condominiumSolvency ?? false,
              catastralRecordYear: documentsInformation.catastralRecordYear ?? '',
              realStateTax: documentsInformation.realStateTax ?? '',
              owner: documentsInformation.owner ?? '',
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
                Adjacency: {
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
                Attribute: {
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
                Equipment: {
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
                Utility: {
                  connect: {
                    id: utilityId,
                  },
                },
              };
            }),
          },
          DistributionsOnProperties: {
            create: validDistributions.map((distribution: any) => {
              const { distributionId, additionalInformation } = distribution as DistributionForm;
              return {
                additionalInformation,
                Distribution: {
                  connect: {
                    id: distributionId,
                  },
                },
              };
            }),
          },
          userId: 'admin@gmail.com',
          id: uuid(),
        },
      });
    }

    return { success: true, error: undefined };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}

export async function activateDeactivateProperty(id: string, current: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.property.update({
      data: {
        active: !current,
      },
      where: { id },
    });

    return {
      success: true,
      error: undefined,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}
