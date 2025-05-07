import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        NegotiationInfomation: true,
        GeneralInformation: {
          select: { code: true, publicationTitle: true, propertyType: true, footageBuilding: true, footageGround: true, description: true },
        },
        LocationInformation: {
          select: {
            state: true,
            avenue: true,
            city: true,
            country: true,
            howToGet: true,
            municipality: true,
            referencePoint: true,
            urbanization: true,
            street: true,
            isClosedStreet: true,
          },
        },
        AttributesOnProperties: { include: { Attribute: true } },
        AdjacenciesOnProperties: { include: { Adjacency: true } },
        EquipmentsOnProperties: { include: { Equipment: true } },
        UtilitiesOnProperties: { include: { Utility: true } },
      },
    });
    return NextResponse.json(property);
  } catch (err) {
    console.log(err);
  }
}
