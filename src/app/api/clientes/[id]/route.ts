import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    let data;
    if (params.id === 'nuevo') {
      data = {};
    } else {
      data = await prisma.client.findUnique({
        where: {
          id: Number(params.id),
        },
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(`error, ${error}`, { status: 500 });
  }
}
