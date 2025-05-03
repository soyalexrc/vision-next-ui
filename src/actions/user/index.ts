'use server';

import { z } from 'zod';
import { UserFormSchema } from '@/lib/interfaces/User';
import { clerkClient } from '@clerk/nextjs/server';
import { getAllowedRoutesByRole } from '@/utils/roles';

export async function getUsersFromClerk(onlyAdvisers = true): Promise<{
  error?: string;
  data: { id: string; fullName: string; email: string }[] | undefined;
}> {
  try {
    const data = await clerkClient.users.getUserList();
    const fields = data.data
      .filter(
        (user) =>
          !onlyAdvisers ||
          user.publicMetadata?.role === 'Asesor inmobiliario vision' ||
          user.publicMetadata?.role === 'Asesor inmobiliario',
      )
      .map((user) => ({
        id: user.id,
        fullName: user.firstName + ' ' + user.lastName,
        email: user.emailAddresses[0].emailAddress,
        publicMetadata: user.publicMetadata,
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

export async function createUser(form: z.infer<typeof UserFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await clerkClient.users.createUser({
      password: form.password,
      username: form.username,
      emailAddress: [form.email],
      firstName: form.firstName,
      lastName: form.lastName,
      publicMetadata: {
        role: form.role,
        allowedRoutes: getAllowedRoutesByRole(form.role),
        phoneNumbers: [form.phoneNumber],
        additionalEmails: [],
      },
      skipPasswordChecks: true,
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function updateUser(form: z.infer<typeof UserFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await clerkClient.users.updateUser(form.id!, {
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password,
      publicMetadata: {
        role: form.role,
        allowedRoutes: getAllowedRoutesByRole(form.role),
        phoneNumbers: [form.phoneNumber],
        additionalEmails: [],
      },
      skipPasswordChecks: true,
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await clerkClient.users.deleteUser(id);
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}
