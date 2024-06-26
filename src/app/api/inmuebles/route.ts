import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams);
  const page = Number(req.nextUrl.searchParams.get('pagina')) || 1;
  const size = Number(req.nextUrl.searchParams.get('cantidad')) || 10;
  try {
    const data = await prisma.property.findMany({
      include: {
        negotiationInformation: { select: { price: true } },
        generalInformation: { select: { code: true } },
      },
      skip: (page - 1) * size,
      take: size,
    });

    const formattedData = data.map((row) => ({
      price: row.negotiationInformation?.price,
      code: row.generalInformation?.code,
      publicationTitle: row.pubicationTitle,
      image: row.images[0],
      id: row.id,
    }));

    return NextResponse.json(formattedData);
  } catch (err) {
    console.error(err);
  }
}
