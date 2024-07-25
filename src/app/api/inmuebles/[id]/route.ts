import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { FilledAttribute } from '@/components/property/admin/PropertyForm';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    let filledAttributes: FilledAttribute[] = [];
    const rawAttributes = await prisma.attribute.findMany({
      orderBy: [{ formType: 'asc' }],
    });
    const equipments = await prisma.equipment.findMany();
    const utilities = await prisma.utility.findMany();
    const adjacencies = await prisma.adjacency.findMany();
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
        const foundAttribute = property?.AttributesOnProperties.find((a) => a.attribyteId === attribute.id);
        return {
          ...attribute,
          value: attribute.formType === 'check' ? Boolean(foundAttribute?.value) ?? false : foundAttribute?.value ?? '',
        };
      });
    }
    return NextResponse.json({ attributes: property ? filledAttributes : rawAttributes, equipments, utilities, adjacencies, property });
  } catch (err) {
    console.log(err);
  }
}
