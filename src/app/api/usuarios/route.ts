import { NextRequest, NextResponse } from 'next/server';
import { clerkClient, User } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const busqueda = params.get('busqueda');

  let users: any;
  try {
    if (busqueda) {
      users = await clerkClient.users.getUserList({
        emailAddress: [busqueda],
        username: [busqueda],
      });
    } else {
      users = await clerkClient.users.getUserList();
    }

    return NextResponse.json(
      users.data.map((user: User) => ({
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        imageUrl: user.imageUrl,
        lastSignInAt: user.lastSignInAt,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: (user.publicMetadata as any)?.phoneNumbers[0] ?? '',
        role: user.publicMetadata?.role ?? '',
        email: user.emailAddresses[0].emailAddress,
      })),
    );
  } catch (err) {
    return NextResponse.json(`error, ${err}`, { status: 500 });
  }
}
