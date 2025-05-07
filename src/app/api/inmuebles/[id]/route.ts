import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import {
  FilledAdjacency,
  FilledAttribute,
  FilledDistribution,
  FilledEquipment,
  FilledUtility,
} from '@/lib/interfaces/property/PropertyForm';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    let filledAttributes: FilledAttribute[] = [];
    let filledUtilities: FilledUtility[] = [];
    let filledEquipments: FilledEquipment[] = [];
    let filledAdjacencies: FilledAdjacency[] = [];
    let filledDistributions: FilledDistribution[] = [];
    const rawAttributes = await prisma.attribute.findMany({
      orderBy: [{ formType: 'asc' }, { label: 'asc' }],
    });
    const rawEquipments = await prisma.equipment.findMany({
      orderBy: [{ title: 'asc' }],
    });
    const rawUtilities = await prisma.utility.findMany({
      orderBy: [{ title: 'asc' }],
    });
    const rawAdjacencies = await prisma.adjacency.findMany({
      orderBy: [{ title: 'asc' }],
    });
    const rawDistributions = await prisma.distribution.findMany({
      orderBy: [{ title: 'asc' }],
    });
    const property = await prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        NegotiationInfomation: true,
        GeneralInformation: true,
        LocationInformation: true,
        DocumentsInformation: true,
        AttributesOnProperties: { include: { Attribute: true } },
        AdjacenciesOnProperties: { include: { Adjacency: true } },
        EquipmentsOnProperties: { include: { Equipment: true } },
        UtilitiesOnProperties: { include: { Utility: true } },
        DistributionsOnProperties: { include: { Distribution: true } },
      },
    });
    if (property) {
      filledAttributes = rawAttributes.map((attribute) => {
        const foundAttribute = property.AttributesOnProperties.find((a) => a.attribyteId === attribute.id);
        return {
          ...attribute,
          value: attribute.formType === 'check' ? Boolean(foundAttribute?.value) ?? false : foundAttribute?.value ?? '',
        };
      });

      filledUtilities = rawUtilities.map((utility) => {
        const foundUtility = property.UtilitiesOnProperties.find((u) => u.utilityId === utility.id);
        return {
          ...utility,
          value: foundUtility,
          additionalInformation: foundUtility?.additionalInformation ?? '',
        };
      });
      filledDistributions = rawDistributions.map((distribution) => {
        const foundDistribution = property.DistributionsOnProperties?.find((d) => d.distributionId === distribution.id);
        return {
          ...distribution,
          value: foundDistribution,
          additionalInformation: foundDistribution?.additionalInformation ?? '',
        };
      });

      filledEquipments = rawEquipments.map((equipment) => {
        const foundEquipment = property.EquipmentsOnProperties.find((p) => p.equipmentId === equipment.id);
        return {
          ...equipment,
          additionalInformation: foundEquipment?.additionalInformation ?? '',
          value: foundEquipment,
          brand: foundEquipment?.brand ?? '',
        };
      });

      filledAdjacencies = rawAdjacencies.map((adjacency) => {
        const foundedAdjacency = property.AdjacenciesOnProperties.find((a) => a.adjacencyId === adjacency.id);
        return {
          ...adjacency,
          value: foundedAdjacency,
        };
      });
    }
    return NextResponse.json({
      attributes: property ? filledAttributes : rawAttributes,
      equipments: property ? filledEquipments : rawEquipments,
      utilities: property ? filledUtilities : rawUtilities,
      distributions: property ? filledDistributions : rawDistributions,
      adjacencies: property ? filledAdjacencies : rawAdjacencies,
      property,
    });
  } catch (err) {
    console.log(err);
  }
}
