import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from '@clerk/backend/jwt';
import { clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const token = cookies.get('__session')?.value;
    if (!token)
      return NextResponse.json({ error: true, message: 'Ocurrio un error al encontrar informacion de la sesion.' }, { status: 400 });
    const { payload } = decodeJwt(token);
    const userId = payload.sub;
    const user = await clerkClient.users.getUser(userId);
    if (!user)
      return NextResponse.json({ error: true, message: 'No se encontro al usuario en la base de datos del sistema' }, { status: 400 });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
