import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const isFeatured = searchParams.get('isFeatured') ? Boolean(searchParams.get('isFeatured')) : false;

  try {
    const data = await prisma.categories.findMany({
      where: {
        isFeatured,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
  }
}
