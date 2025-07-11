
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getServiceById, getServiceDocuments } from "@/lib/data-service";
import { DocumentRequirement, ScannedDocument, Service } from "@/lib/types";
import { Check, FileText, X } from "lucide-react";

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [service, setService] = useState<Service | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<ScannedDocument[]>([]);

  useEffect(() => {
    if (id) {
      const serviceData = getServiceById(id);
      if (serviceData) {
        setService(serviceData);
        const docs = getServiceDocuments(id);
        setUploadedDocs(docs);
      }
    }
  }, [id]);

  const handleScanDocument = (docTypeId: string) => {
    navigate(`/scanner?serviceId=${id}&docTypeId=${docTypeId}`);
  };

  const getDocumentStatus = (docRequirement: DocumentRequirement) => {
    const uploaded = uploadedDocs.find(doc => doc.documentTypeId === docRequirement.id);
    return {
      isUploaded: !!uploaded,
      document: uploaded,
    };
  };

  const allRequiredDocsUploaded = () => {
    if (!service) return false;
    const requiredDocs = service.requiredDocuments.filter(doc => doc.required);
    return requiredDocs.every(doc => uploadedDocs.some(uploaded => uploaded.documentTypeId === doc.id));
  };

  if (!service) {
    return (
      <Layout title={t('loading')} showBack>
        <div>{t('loading')}</div>
      </Layout>
    );
  }

  return (
    <Layout title={service.name} showBack>
      <div className="p-4 space-y-4">
        <div className="bg-akshaya-light rounded-lg p-4">
          <h2 className="text-lg font-medium text-akshaya-primary mb-1">{service.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Fee: ₹{service.fee}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-md font-medium mb-4">{t('requiredDocuments')}</h3>
          <div className="space-y-4">
            {service.requiredDocuments.map((doc) => {
              const { isUploaded, document } = getDocumentStatus(doc);
              
              return (
                <div 
                  key={doc.id} 
                  className={`p-3 rounded-lg border ${isUploaded ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">
                          {doc.name}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </h4>
                        {isUploaded && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Check size={12} className="mr-1" />
                            {t('uploaded')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                    </div>

                    <Button 
                      variant={isUploaded ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleScanDocument(doc.id)}
                    >
                      <FileText size={16} className="mr-1" />
                      {isUploaded ? t('rescan') : t('scan')}
                    </Button>
                  </div>
                  
                  {isUploaded && document && (
                    <div className="mt-2 flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                      <div className="flex items-center text-sm">
                        <FileText size={14} className="mr-1 text-akshaya-primary" />
                        <span className="text-xs truncate max-w-[150px]">
                          {document.fileName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(document.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-6 p-4">
          <Button 
            className="w-full" 
            size="lg"
            disabled={!allRequiredDocsUploaded()}
            onClick={() => navigate(`/payment/${service.id}`)}
          >
            {t('proceedToPayment')} (₹{service.fee})
          </Button>
          
          {!allRequiredDocsUploaded() && (
            <p className="text-xs text-center text-red-500 mt-2">
              {t('uploadAllRequired')}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
