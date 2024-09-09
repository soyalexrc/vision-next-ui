'use server';

import { z } from 'zod';
import { UserFormSchema } from '@/lib/interfaces/User';
import { clerkClient } from '@clerk/nextjs/server';
import { getAllowedRoutesByRole } from '@/utils/roles';

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
