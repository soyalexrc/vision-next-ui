import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    const attributes = await prisma.attribute.findMany({
      orderBy: [{ formType: 'asc' }],
    });
    const equipments = await prisma.equipment.findMany();
    const utilities = await prisma.utility.findMany();
    const adjacencies = await prisma.adjacency.findMany();
    return NextResponse.json({ attributes, equipments, utilities, adjacencies });
  } catch (err) {
    console.error(err);
  }
}
