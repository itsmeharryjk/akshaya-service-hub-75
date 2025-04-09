import { Service, ScannedDocument } from "./types";
import { FileText, FileCheck, FileSignature, User, CreditCard, Home, Landmark, Car, BadgeDollarSign, Building, Phone, FileIcon, IdCard } from "lucide-react";

// Mock services data
export const services: Service[] = [
  {
    id: "ration-card",
    name: "Ration Card",
    icon: "CreditCard",
    description: "Apply for a new ration card or update existing card details",
    fee: 100,
    requiredDocuments: [
      {
        id: "address-proof",
        name: "Address Proof",
        description: "Electricity bill, water bill, or any government issued address proof",
        required: true,
      },
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "income-certificate",
        name: "Income Certificate",
        description: "Certificate issued by the revenue department",
        required: true,
      },
      {
        id: "passport-photo",
        name: "Passport Photo",
        description: "Recent passport size photograph",
        required: true,
      }
    ]
  },
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    icon: "FileCheck",
    description: "Apply for a birth certificate or get a duplicate copy",
    fee: 50,
    requiredDocuments: [
      {
        id: "hospital-certificate",
        name: "Hospital Certificate",
        description: "Certificate issued by the hospital where the birth took place",
        required: true,
      },
      {
        id: "parent-id",
        name: "Parent's ID Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card of parents",
        required: true,
      }
    ]
  },
  {
    id: "income-certificate",
    name: "Income Certificate",
    icon: "FileSignature",
    description: "Apply for an income certificate for various purposes",
    fee: 75,
    requiredDocuments: [
      {
        id: "salary-slip",
        name: "Salary Slip",
        description: "Last 3 months salary slips if employed",
        required: false,
      },
      {
        id: "tax-return",
        name: "Tax Return",
        description: "Income tax return of the last financial year",
        required: true,
      },
      {
        id: "bank-statement",
        name: "Bank Statement",
        description: "Bank statement for the last 6 months",
        required: true,
      }
    ]
  },
  {
    id: "residence-certificate",
    name: "Residence Certificate",
    icon: "Home",
    description: "Apply for a residence certificate for proof of domicile",
    fee: 60,
    requiredDocuments: [
      {
        id: "address-proof",
        name: "Address Proof",
        description: "Electricity bill, water bill, or any government issued address proof",
        required: true,
      },
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "residence-proof",
        name: "Proof of Residence",
        description: "Rent agreement, property document, or utility bills for past 6 months",
        required: true,
      }
    ]
  },
  {
    id: "pension-scheme",
    name: "Pension Scheme",
    icon: "User",
    description: "Apply for various pension schemes offered by the government",
    fee: 0,
    requiredDocuments: [
      {
        id: "age-proof",
        name: "Age Proof",
        description: "Birth certificate, school leaving certificate, or any other age proof document",
        required: true,
      },
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "bank-details",
        name: "Bank Account Details",
        description: "Bank passbook or cancelled cheque",
        required: true,
      }
    ]
  },
  {
    id: "caste-certificate",
    name: "Caste Certificate",
    icon: "FileText",
    description: "Apply for a caste certificate for various benefits and reservations",
    fee: 50,
    requiredDocuments: [
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "parent-certificate",
        name: "Parent's Caste Certificate",
        description: "Caste certificate of either parent",
        required: false,
      },
      {
        id: "residence-proof",
        name: "Residence Proof",
        description: "Proof of residence in the state",
        required: true,
      }
    ]
  },
  {
    id: "land-record",
    name: "Land Records",
    icon: "Landmark",
    description: "Get copies of land records and property documents",
    fee: 120,
    requiredDocuments: [
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "previous-records",
        name: "Previous Records",
        description: "Previous land records or document numbers if available",
        required: false,
      }
    ]
  },
  {
    id: "driving-license",
    name: "Driving License",
    icon: "IdCard",
    description: "Apply for a new driving license or renew your existing one",
    fee: 200,
    requiredDocuments: [
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "address-proof",
        name: "Address Proof",
        description: "Electricity bill, water bill, or any government issued address proof",
        required: true,
      },
      {
        id: "photos",
        name: "Photos",
        description: "Recent passport size photographs",
        required: true,
      }
    ]
  },
  {
    id: "vehicle-registration",
    name: "Vehicle Registration",
    icon: "Car",
    description: "Register your vehicle or transfer ownership",
    fee: 250,
    requiredDocuments: [
      {
        id: "vehicle-invoice",
        name: "Vehicle Invoice",
        description: "Original invoice of the vehicle",
        required: true,
      },
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "address-proof",
        name: "Address Proof",
        description: "Electricity bill, water bill, or any government issued address proof",
        required: true,
      }
    ]
  },
  {
    id: "income-tax",
    name: "Income Tax",
    icon: "BadgeDollarSign",
    description: "File income tax returns or check status",
    fee: 100,
    requiredDocuments: [
      {
        id: "pan-card",
        name: "PAN Card",
        description: "Permanent Account Number card",
        required: true,
      },
      {
        id: "income-proof",
        name: "Income Proof",
        description: "Salary slips, Form 16, or other income documents",
        required: true,
      },
      {
        id: "investment-proof",
        name: "Investment Proof",
        description: "Documents related to tax-saving investments",
        required: false,
      }
    ]
  },
  {
    id: "land-tax",
    name: "Land Tax",
    icon: "Landmark",
    description: "Pay land tax or get land tax certificate",
    fee: 150,
    requiredDocuments: [
      {
        id: "land-deed",
        name: "Land Deed",
        description: "Copy of the land deed or registration document",
        required: true,
      },
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "tax-receipt",
        name: "Previous Tax Receipt",
        description: "Receipt of the last tax payment if applicable",
        required: false,
      }
    ]
  },
  {
    id: "property-tax",
    name: "Property Tax",
    icon: "Building",
    description: "Pay property tax or get property tax certificate",
    fee: 200,
    requiredDocuments: [
      {
        id: "property-deed",
        name: "Property Deed",
        description: "Copy of the property deed or registration document",
        required: true,
      },
      {
        id: "identity-proof",
        name: "Identity Proof",
        description: "Aadhaar card, voter ID, or any government issued identity card",
        required: true,
      },
      {
        id: "tax-receipt",
        name: "Previous Tax Receipt",
        description: "Receipt of the last tax payment if applicable",
        required: false,
      }
    ]
  }
];

// Local storage keys
const DOCUMENTS_STORAGE_KEY = 'akshaya_scanned_documents';

// Get all stored documents
export const getStoredDocuments = (): ScannedDocument[] => {
  const storedData = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Save a new document
export const saveDocument = (document: ScannedDocument): void => {
  const documents = getStoredDocuments();
  documents.push(document);
  localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
};

// Get documents for a specific service
export const getServiceDocuments = (serviceId: string): ScannedDocument[] => {
  const documents = getStoredDocuments();
  return documents.filter(doc => doc.serviceId === serviceId);
};

// Delete a document
export const deleteDocument = (documentId: string): void => {
  const documents = getStoredDocuments();
  const updatedDocuments = documents.filter(doc => doc.id !== documentId);
  localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(updatedDocuments));
};

// Get service by ID
export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

// Get icon component by name
export const getIconByName = (iconName: string) => {
  const icons = {
    FileText,
    FileCheck,
    FileSignature,
    User,
    CreditCard,
    Home,
    Landmark,
    Car,
    BadgeDollarSign,
    Building,
    Phone,
    FileIcon,
    IdCard
  };
  
  return icons[iconName as keyof typeof icons] || FileText;
};
