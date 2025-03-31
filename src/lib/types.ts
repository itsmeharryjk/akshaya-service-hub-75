
export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  fee: number;
  requiredDocuments: DocumentRequirement[];
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface ScannedDocument {
  id: string;
  serviceId: string;
  documentTypeId: string;
  documentTypeName: string;
  file: string; // base64 encoded data
  fileName: string;
  createdAt: string;
}
