import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    const data = await prisma.socialMediaLink.findMany();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json('Ocurrio un error', { status: 500 });
  }
}
