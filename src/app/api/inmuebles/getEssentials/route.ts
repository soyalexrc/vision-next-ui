import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const attributes = await prisma.attribute.findMany({
      orderBy: [{ formType: 'asc' }],
    });
    const equipments = await prisma.equipment.findMany();
    const utilities = await prisma.utility.findMany();
    return NextResponse.json({ attributes, equipments, utilities });
  } catch (err) {
    console.error(err);
  }
}
