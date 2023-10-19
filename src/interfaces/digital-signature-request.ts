export interface DigitalSignatureRequest {
    id?: string | number;
    filePath: string;
    signedDocumentPath: string;
    expiresAt: Date,
    createdAt: Date,
    sendToEmail: string,
    status: string,
    requestedBy: string;
    sendToData: any,
    clientId: number | null,
    ownerId: number | null,
    allyId: number | null,
    externalAdviserId: number | null,

}
