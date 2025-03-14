import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';
import { generateNewCode } from '@/utils/string';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let temporalCodeId = '';
    const latestGeneralInformation = await prisma.generalInformation.findFirst({
      select: { code: true },
      orderBy: { code: 'desc' },
    });

    const newCodeId = generateNewCode(latestGeneralInformation!.code);

    const nextTemporalIdExists = await prisma.temporalId.findFirst({
      where: {
        type: 'vinm_code',
        value: newCodeId,
      },
    });

    if (!nextTemporalIdExists) {
      const newTemporalId = await prisma.temporalId.create({
        data: {
          type: 'vinm_code',
          value: newCodeId,
        },
      });
      temporalCodeId = newTemporalId.value as string;
    } else {
      const latestTemporalId = await prisma.temporalId.findFirst({
        select: { value: true },
        orderBy: { value: 'desc' },
      });
      const nextNewCodeId = generateNewCode(latestTemporalId!.value as string);
      const newTemporalId = await prisma.temporalId.create({
        data: {
          type: 'vinm_code',
          value: nextNewCodeId,
        },
      });
      temporalCodeId = newTemporalId.value as string;
    }

    return NextResponse.json({ id: temporalCodeId });
  } catch (err) {
    console.log(err);
  }
}
