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
}

export interface MetadataAllowedRoutes {
  path: string;
  title: string;
}

export const UserFormSchema = z.object({
  firstName: z.string(),
  id: z.string().optional(),
  lastName: z.string(),
  password: z.string().optional(),
  username: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  role: z.string(),
});
