import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const users = await clerkClient.users.getUserList();
    console.log('users in /api', users);
    return NextResponse.json(
      users.data.map((user) => ({
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
