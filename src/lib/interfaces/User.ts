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
  type: string;
  service: MetadataService;
}

export interface MetadataService {
  title: string;
  value: string;
}
