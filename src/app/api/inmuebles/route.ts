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
  const code = params.get('codigo');
  const state = params.get('estado');
  const municipality = params.get('municipio');
  const adviserId = params.get('asesor');
  const isFeatured = params.get('destacado');
  const whereClause: any = {};

  if (busqueda) {
    whereClause.OR = [
      {
        GeneralInformation: {
          publicationTitle: { contains: busqueda, mode: 'insensitive' },
        },
      },
      {
        GeneralInformation: {
          propertyType: { contains: busqueda, mode: 'insensitive' },
        },
      },
      {
        GeneralInformation: {
          code: { contains: busqueda, mode: 'insensitive' },
        },
      },

      { NegotiationInfomation: { operationType: { contains: busqueda, mode: 'insensitive' } } },
    ];
  }

  if (isFeatured && isFeatured === 'true') {
    whereClause.isFeatured = isFeatured === 'true';
  }

  if (code) {
    whereClause.GeneralInformation = {
      ...whereClause.GeneralInformation,
      code: { contains: code, mode: 'insensitive' },
    };
  }

  if (state) {
    whereClause.LocationInformation = {
      ...whereClause.LocationInformation,
      state: { contains: state, mode: 'insensitive' },
    };
  }

  if (municipality) {
    whereClause.LocationInformation = {
      ...whereClause.LocationInformation,
      municipality: { contains: municipality, mode: 'insensitive' },
    };
  }

  if (operationType && operationType !== 'todos') {
    whereClause.NegotiationInfomation = {
      ...whereClause.NegotiationInfomation,
      operationType: { contains: operationType, mode: 'insensitive' },
    };
  }

  // TODO mostrar solo los activos en la ruta web, validar ruta que no sea admin
  if (status && status !== 'todos') {
    whereClause.active = status === 'true';
  }

  if (propertyType && propertyType !== 'todos') {
    whereClause.GeneralInformation = {
      ...whereClause.GeneralInformation,
      propertyType: { contains: propertyType, mode: 'insensitive' },
    };
  }

  if (adviserId && adviserId !== '') {
    whereClause.NegotiationInfomation = {
      ...whereClause.NegotiationInfomation,
      realStateAdviser: adviserId,
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
        NegotiationInfomation: {
          select: {
            price: true,
            operationType: true,
            realStateAdviser: true,
            externalAdviser: true,
            ally: true,
            realstateadvisername: true,
          },
        },
        GeneralInformation: {
          select: { code: true, publicationTitle: true, propertyType: true, footageBuilding: true, footageGround: true, description: true },
        },
        LocationInformation: {
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
      price: row.NegotiationInfomation?.price,
      code: row.GeneralInformation?.code,
      operationType: row.NegotiationInfomation?.operationType,
      isFeatured: row.isFeatured,
      realstateadvisername: row.NegotiationInfomation?.realstateadvisername,
      publicationTitle: row.GeneralInformation?.publicationTitle,
      propertyType: row.GeneralInformation?.propertyType,
      footageBuilding: row.GeneralInformation?.footageBuilding,
      footageGround: row.GeneralInformation?.footageGround,
      municipality: row.LocationInformation?.municipality,
      state: row.LocationInformation?.state,
      avenue: row.LocationInformation?.avenue,
      urbanization: row.LocationInformation?.urbanization,
      street: row.LocationInformation?.street,
      description: row.GeneralInformation?.description,
      images: row.images ?? ['/vision-icon.png'],
      adviserId: row.NegotiationInfomation?.realStateAdviser,
      allyId: row.NegotiationInfomation?.ally,
      externalAdviserId: row.NegotiationInfomation?.externalAdviser,
    }));

    return NextResponse.json({ properties: formattedData, totalPages });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener los inmuebles' }, { status: 500 });
  }
}
