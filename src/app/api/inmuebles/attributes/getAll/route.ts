import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    const data = await prisma.attribute.findMany({
      orderBy: [{ formType: 'asc' }],
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
  }
}
