import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log(params.id);
    const property = await prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        negotiationInformation: true,
        generalInformation: true,
        locationInformation: true,
        documentsInformation: true,
      },
    });

    return NextResponse.json(property);
  } catch (err) {
    console.log(err);
  }
}
