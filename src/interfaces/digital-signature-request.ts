export interface DigitalSignatureRequest {
  id?: string | number;
  filePath: string;
  signedDocumentPath: string;
  expiresAt: Date;
  createdAt: Date;
  sendToEmail: string;
  status: string;
  requestedBy: string;
  sendToData: any;
  clientId: number | null;
  ownerId: number | null;
  allyId: number | null;
  externalAdviserId: number | null;
}

export interface GetDigitalSignatureRequestById {
  data: DigitalSignatureRequest;
  user: Owner;
  message?: string;
  error?: boolean;
}

interface Owner {
  id: number;
  ci: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  isInvestor: boolean;
  createdAt: Date;
  updatedAt: Date;
}
