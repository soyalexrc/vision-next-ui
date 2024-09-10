import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    const data = await prisma.externalAdviser.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(`error, ${JSON.stringify(error)}`, { status: 500 });
  }
}
