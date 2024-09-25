import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const busqueda = params.get('busqueda');

  const whereClause: any = {};

  if (busqueda) {
    whereClause.OR = [
      { phone: { contains: busqueda, mode: 'insensitive' } },
      { serviceName: { contains: busqueda, mode: 'insensitive' } },
      { name: { contains: busqueda, mode: 'insensitive' } },
      { subServiceName: { contains: busqueda, mode: 'insensitive' } },
      { contactFrom: { contains: busqueda, mode: 'insensitive' } },
    ];
  }
  try {
    const data = await prisma.client.findMany({
      where: whereClause,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(`error, ${JSON.stringify(error)}`, { status: 500 });
  }
}
