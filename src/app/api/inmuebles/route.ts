import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const busqueda = params.get('busqueda');
  const page = Number(params.get('pagina')) || 1;
  const size = Number(params.get('cantidad')) || 10;
  const operationType = params.get('tipo-de-operacion') || 'todos';
  const status = params.get('status') || 'true';
  const propertyType = params.get('tipo-de-inmueble') || 'todos';
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

  if (operationType && operationType !== 'todos') {
    whereClause.negotiationInformation = {
      ...whereClause.negotiationInformation,
      operationType: { contains: operationType, mode: 'insensitive' },
    };
  }

  // TODO mostrar solo los activos en la ruta web, validar ruta que no sea admin
  if (status && status !== 'todos') {
    whereClause.active = status === 'true';
  }

  if (propertyType && propertyType !== 'todos') {
    whereClause.generalInformation = {
      ...whereClause.generalInformation,
      propertyType: { contains: propertyType, mode: 'insensitive' },
    };
  }

  // console.log(req.nextUrl.searchParams);
  // const page = Number(req.nextUrl.searchParams.get('pagina')) || 1;
  // const size = Number(req.nextUrl.searchParams.get('cantidad')) || 10;
  try {
    const totalProperties = await prisma.property.count({ where: whereClause });
    const totalPages = Math.ceil(totalProperties / size);
    const data = await prisma.property.findMany({
      include: {
        negotiationInformation: { select: { price: true, operationType: true } },
        generalInformation: {
          select: { code: true, publicationTitle: true, propertyType: true, footageBuilding: true, description: true },
        },
        locationInformation: {
          select: {
            municipality: true,
            urbanization: true,
            avenue: true,
            street: true,
            state: true,
          },
        },
      },
      where: whereClause,
      skip: (page - 1) * size,
      take: size,
    });

    const formattedData = data.map((row) => ({
      id: row.id,
      slug: row.slug,
      active: row.active,
      price: row.negotiationInformation?.price,
      code: row.generalInformation?.code,
      operationType: row.negotiationInformation?.operationType,
      isFeatured: row.isFeatured,
      publicationTitle: row.generalInformation?.publicationTitle,
      propertyType: row.generalInformation?.propertyType,
      footageBuilding: row.generalInformation?.footageBuilding,
      municipality: row.locationInformation?.municipality,
      state: row.locationInformation?.state,
      avenue: row.locationInformation?.avenue,
      urbanization: row.locationInformation?.urbanization,
      street: row.locationInformation?.street,
      description: row.generalInformation?.description,
      images: row.images ?? ['/vision-icon.png'],
    }));

    return NextResponse.json({ properties: formattedData, totalPages });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener los inmuebles' }, { status: 500 });
  }
}
