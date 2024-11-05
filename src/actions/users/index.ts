'use server';

import { clerkClient } from '@clerk/nextjs/server';

export async function getUsersFromClerk(): Promise<{ error?: string; data: { id: string; fullName: string; email: string }[] | undefined }> {
  try {
    const data = await clerkClient.users.getUserList();
    const fields = data.data
      .filter((user) => user.publicMetadata?.role === 'Asesor inmobiliario vision' || user.publicMetadata?.role === 'Asesor inmobiliario')
      .map((user) => ({
        id: user.id,
        fullName: user.firstName + ' ' + user.lastName,
        email: user.emailAddresses[0].emailAddress,
      }));
    return {
      data: fields,
      error: undefined,
    };
  } catch (err) {
    console.error(err);
    return {
      data: undefined,
      error: JSON.stringify(err),
    };
  }
}
