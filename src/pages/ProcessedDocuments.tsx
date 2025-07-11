import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Calendar,
  User
} from "lucide-react";
import { toast } from "sonner";

interface ProcessedDocument {
  id: string;
  serviceName: string;
  serviceId: string;
  documentType: string;
  applicationDate: string;
  processedDate?: string;
  status: 'processing' | 'completed' | 'ready_for_pickup' | 'rejected';
  referenceNumber: string;
  downloadUrl?: string;
  remarks?: string;
}

const mockProcessedDocuments: ProcessedDocument[] = [
  {
    id: "pd1",
    serviceName: "Income Certificate",
    serviceId: "income-certificate",
    documentType: "Income Certificate",
    applicationDate: "2025-01-10",
    processedDate: "2025-01-15",
    status: "completed",
    referenceNumber: "IC2025001234",
    downloadUrl: "#",
    remarks: "Certificate issued successfully"
  },
  {
    id: "pd2",
    serviceName: "Birth Certificate",
    serviceId: "birth-certificate",
    documentType: "Birth Certificate",
    applicationDate: "2025-01-08",
    processedDate: "2025-01-14",
    status: "ready_for_pickup",
    referenceNumber: "BC2025005678",
    remarks: "Ready for collection at Akshaya center"
  },
  {
    id: "pd3",
    serviceName: "Ration Card",
    serviceId: "ration-card",
    documentType: "Ration Card Application",
    applicationDate: "2025-01-12",
    status: "processing",
    referenceNumber: "RC2025009876",
    remarks: "Under verification by revenue department"
  },
  {
    id: "pd4",
    serviceName: "Residence Certificate",
    serviceId: "residence-certificate",
    documentType: "Residence Certificate",
    applicationDate: "2025-01-05",
    processedDate: "2025-01-13",
    status: "rejected",
    referenceNumber: "RS2025004321",
    remarks: "Additional documents required. Please resubmit with proper address proof."
  }
];

const ProcessedDocuments: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading processed documents
    setTimeout(() => {
      setDocuments(mockProcessedDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: ProcessedDocument['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'ready_for_pickup':
        return <FileCheck size={16} className="text-blue-600" />;
      case 'processing':
        return <Clock size={16} className="text-yellow-600" />;
      case 'rejected':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status: ProcessedDocument['status']) => {
    const variants = {
      completed: { variant: "default" as const, text: t('completed'), className: "bg-green-100 text-green-800" },
      ready_for_pickup: { variant: "secondary" as const, text: t('readyForPickup'), className: "bg-blue-100 text-blue-800" },
      processing: { variant: "outline" as const, text: t('processing'), className: "bg-yellow-100 text-yellow-800" },
      rejected: { variant: "destructive" as const, text: t('rejected'), className: "bg-red-100 text-red-800" }
    };

    const config = variants[status];
    return (
      <Badge className={config.className}>
        {config.text}
      </Badge>
    );
  };

  const handleDownload = (doc: ProcessedDocument) => {
    if (doc.downloadUrl) {
      // In a real app, this would download the actual document
      toast.success(`Downloading ${doc.documentType}...`);
    } else {
      toast.error("Document not available for download");
    }
  };

  const handleView = (doc: ProcessedDocument) => {
    // In a real app, this would open a document viewer
    toast.info(`Opening ${doc.documentType} for preview`);
  };

  const handleReapply = (doc: ProcessedDocument) => {
    navigate(`/service/${doc.serviceId}`);
  };

  if (loading) {
    return (
      <Layout title={t('processedDocuments')} showBack>
        <div className="p-4 space-y-4">
          <div className="bg-akshaya-light rounded-lg p-4 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t('processedDocuments')} showBack>
      <div className="p-4 space-y-4">
        <div className="bg-akshaya-light rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-akshaya-primary mb-2">{t('processedDocuments')}</h2>
          <p className="text-gray-600 text-sm">
            {t('processedDocumentsDescription')}
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">{t('noProcessedDocuments')}</h3>
            <p className="text-sm text-gray-500 mt-2">
              {t('noProcessedDocumentsDescription')}
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => navigate('/')}
            >
              {t('browseServices')}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium">{doc.serviceName}</h3>
                      {getStatusBadge(doc.status)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Ref: {doc.referenceNumber}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-400">
                    {getStatusIcon(doc.status)}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span>{t('applied')}: {new Date(doc.applicationDate).toLocaleDateString()}</span>
                  </div>
                  
                  {doc.processedDate && (
                    <div className="flex items-center gap-2">
                      <CheckCircle size={12} />
                      <span>{t('processed')}: {new Date(doc.processedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {doc.remarks && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                    <strong>{t('remarks')}:</strong> {doc.remarks}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  {doc.status === 'completed' && doc.downloadUrl && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleDownload(doc)}
                      className="flex-1"
                    >
                      <Download size={14} className="mr-1" />
                      {t('download')}
                    </Button>
                  )}
                  
                  {(doc.status === 'completed' || doc.status === 'ready_for_pickup') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleView(doc)}
                      className="flex-1"
                    >
                      <Eye size={14} className="mr-1" />
                      {t('view')}
                    </Button>
                  )}
                  
                  {doc.status === 'rejected' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReapply(doc)}
                      className="flex-1"
                    >
                      <FileText size={14} className="mr-1" />
                      {t('reapply')}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
          <h3 className="text-md font-medium text-gray-800 mb-2">{t('needHelp')}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {t('needHelpDescription')}
          </p>
          <Button 
            variant="outline" 
            className="w-full border-akshaya-primary text-akshaya-primary hover:bg-akshaya-light"
            onClick={() => toast.info("Redirecting to support...")}
          >
            {t('contactSupport')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessedDocuments;