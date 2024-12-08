import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let newVinmId: string = '';
    const amountOfProperties = await prisma.property.count();
    console.log('amountOfProperties', amountOfProperties);
    switch (String(amountOfProperties).length) {
      case 1:
        newVinmId = `VINM_00${amountOfProperties + 1}`;
        break;
      case 2:
        newVinmId = `VINM_0${amountOfProperties + 1}`;
        break;
      case 3:
        newVinmId = `VINM_${amountOfProperties + 1}`;
        break;
    }
    return NextResponse.json({ id: newVinmId });
  } catch (err) {
    console.log(err);
  }
}
