import { z } from 'zod';

export interface ShortUser {
  id: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  lastSignInAt: number;
  username: string;
  firstName: null;
  lastName: null;
  publicMetadata: PublicMetadata;
  privateMetadata: EMetadata;
  phoneNumber: string;
  role: string;
  email: string;
}

export interface ClerkUser {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: null;
  primaryWeb3WalletId: null;
  lastSignInAt: number;
  externalId: null;
  username: string;
  firstName: null;
  lastName: null;
  publicMetadata: PublicMetadata;
  privateMetadata: EMetadata;
  unsafeMetadata: EMetadata;
  emailAddresses: EmailAddress[];
  phoneNumbers: any[];
  web3Wallets: any[];
  externalAccounts: any[];
  samlAccounts: any[];
  lastActiveAt: number;
  createOrganizationEnabled: boolean;
}

export interface EmailAddress {
  id: string;
  emailAddress: string;
  verification: Verification;
  linkedTo: any[];
}

export interface Verification {
  status: string;
  strategy: string;
  externalVerificationRedirectURL: null;
  attempts: null;
  expireAt: null;
  nonce: null;
}

export interface EMetadata {}

export interface PublicMetadata {
  role: string;
  allowedRoutes: MetadataAllowedRoutes[];
  phoneNumbers: string[];
  additionalEmails: string[];
}

export interface MetadataAllowedRoutes {
  path: string;
  title: string;
}

export const UserFormSchema = z.object({
  firstName: z.string().min(3, 'Minimo 3 caracteres'),
  id: z.string().optional(),
  lastName: z.string().min(3, 'Minimo 3 caracteres'),
  password: z.string().optional(),
  username: z.string().min(3, 'Minimo 3 caracteres').trim(),
  phoneNumber: z.string(),
  email: z.string().email({ message: 'Email invalido' }),
  role: z.string().min(3, 'Este campo es requerido'),
});
