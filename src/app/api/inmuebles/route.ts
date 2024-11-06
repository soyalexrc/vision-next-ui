import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const busqueda = params.get('busqueda');

  const whereClause: any = {};

  if (busqueda) {
    whereClause.OR = [
      {
        generalInformation: {
          publicationTitle: { contains: busqueda, mode: 'insensitive' },
        },
      },
      {
        generalInformation: {
          propertyType: { contains: busqueda, mode: 'insensitive' },
        },
      },
      {
        generalInformation: {
          code: { contains: busqueda, mode: 'insensitive' },
        },
      },

      { negotiationInformation: { operationType: { contains: busqueda, mode: 'insensitive' } } },
    ];
  }
  // console.log(req.nextUrl.searchParams);
  // const page = Number(req.nextUrl.searchParams.get('pagina')) || 1;
  // const size = Number(req.nextUrl.searchParams.get('cantidad')) || 10;
  try {
    const data = await prisma.property.findMany({
      include: {
        negotiationInformation: { select: { price: true, operationType: true } },
        generalInformation: {
          select: { code: true, publicationTitle: true, propertyType: true, footageBuilding: true, description: true },
        },
      },
      where: whereClause,
    });

    const formattedData = data.map((row) => ({
      id: row.id,
      slug: row.slug,
      price: row.negotiationInformation?.price,
      code: row.generalInformation?.code,
      operationType: row.negotiationInformation?.operationType,
      isFeatured: row.isFeatured,
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
