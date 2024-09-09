import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await clerkClient.users.getUser(params.id);
    return NextResponse.json({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      imageUrl: user.imageUrl,
      lastSignInAt: user.lastSignInAt,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.publicMetadata?.role ?? '',
      email: user.emailAddresses[0].emailAddress,
    });
  } catch (error: any) {
    return NextResponse.json(`error, ${JSON.stringify(error)}`, { status: 500 });
  }
}
