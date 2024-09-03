import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.searchParams);
  const page = Number(req.nextUrl.searchParams.get('pagina')) || 1;
  const size = Number(req.nextUrl.searchParams.get('cantidad')) || 10;
  try {
    const data = await prisma.property.findMany({
      include: {
        negotiationInformation: { select: { price: true, operationType: true } },
        generalInformation: {
          select: { code: true, publicationTitle: true, propertyType: true, footageBuilding: true, description: true },
        },
      },
      skip: (page - 1) * size,
      take: size,
    });

    const formattedData = data.map((row) => ({
      id: row.id,
      slug: row.slug,
      price: row.negotiationInformation?.price,
      code: row.generalInformation?.code,
      operationType: row.negotiationInformation?.operationType,
      publicationTitle: row.generalInformation?.publicationTitle,
      propertyType: row.generalInformation?.propertyType,
      footageBuilding: row.generalInformation?.footageBuilding,
      description: row.generalInformation?.description,
      images: row.images ?? ['/vision-icon.png'],
    }));

    return NextResponse.json(formattedData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener los inmuebles' }, { status: 500 });
  }
}
