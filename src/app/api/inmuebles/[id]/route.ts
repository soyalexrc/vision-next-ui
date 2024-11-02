import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { FilledAdjacency, FilledAttribute, FilledEquipment, FilledUtility } from '@/lib/interfaces/property/PropertyForm';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    let filledAttributes: FilledAttribute[] = [];
    let filledUtilities: FilledUtility[] = [];
    let filledEquipments: FilledEquipment[] = [];
    let filledAdjacencies: FilledAdjacency[] = [];
    const rawAttributes = await prisma.attribute.findMany({
      orderBy: [{ formType: 'asc' }, { label: 'asc' }],
    });
    const rawEquipments = await prisma.equipment.findMany();
    const rawUtilities = await prisma.utility.findMany();
    const rawAdjacencies = await prisma.adjacency.findMany();
    const property = await prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        negotiationInformation: true,
        generalInformation: true,
        locationInformation: true,
        documentsInformation: true,
        AttributesOnProperties: { include: { attribute: true } },
        AdjacenciesOnProperties: { include: { adjacency: true } },
        EquipmentsOnProperties: { include: { equipment: true } },
        UtilitiesOnProperties: { include: { utility: true } },
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
      adjacencies: property ? filledAdjacencies : rawAdjacencies,
      property,
    });
  } catch (err) {
    console.log(err);
  }
}
